# Logging

## AdvantageKit Logging
Logging with AdvantageKit is really easy. In your hardware class, create a class at the top like so: 

```java Hardware Class
@AutoLog
public static class ShooterInputs {
    public int canId;
    public double positionRotations;
    public double velocityRotationsPerSec;
    public double supplyCurrentAmps;
    public double statorCurrentAmps;
    public double supplyVoltageVolts;
    public double motorVoltageVolts;
    public double temperatureCelsius;
}
```
This class should define all the values that you want logged. The neat thing about AdvantageKit is the @AutoLog annotation above the class, it does all the logging auto-magically for you. 

Next, we need to add a way for the motor to report its values to be logged. The StatusSignal allows us to access the values that a motor has stored. Simply add these objects to the class:
```java Hardware Class
private final StatusSignal<Angle> position;
private final StatusSignal<AngularVelocity> velocity;
private final StatusSignal<Current> supplyCurrent;
private final StatusSignal<Current> statorCurrent;
private final StatusSignal<Voltage> supplyVoltage;
private final StatusSignal<Voltage> motorVoltage;
private final StatusSignal<Temperature> temperature;
```
CANid in this case is not a value that the motor reports so it's not included.

Next, intialize all of the values in the constructor with the motor's values:
```java Hardware Class
position = motor.getPosition();
velocity = motor.getVelocity();
supplyCurrent = motor.getSupplyCurrent();
statorCurrent = motor.getStatorCurrent();
supplyVoltage = motor.getSupplyVoltage();
motorVoltage = motor.getMotorVoltage();
temperature = motor.getDeviceTemp();
```

Same as with the motor object, we intialize these in the constructor. This doesn't read anything yet, it just hooks each signal up to the motor so we can use them later.

Next, we need to have some method to update the logging. We can refresh a device's StatusSignals and then assign them with a function like so:
```java Hardware Class
public void refreshSignals(ShooterInputs inputs){
    BaseStatusSignal.refreshAll(
        position, velocity, supplyCurrent, statorCurrent, supplyVoltage, motorVoltage, temperature); 

    inputs.canId = Constants.SHOOTER_MOTOR_ID;
    inputs.positionRotations = position.getValue().in(Units.Rotations);
    inputs.velocityRotationsPerSec = velocity.getValue().in(Units.RotationsPerSecond);
    inputs.supplyCurrentAmps = supplyCurrent.getValue().in(Units.Amps);
    inputs.statorCurrentAmps = statorCurrent.getValue().in(Units.Amps);
    inputs.supplyVoltageVolts = supplyVoltage.getValue().in(Units.Volts);
    inputs.motorVoltageVolts = motorVoltage.getValue().in(Units.Volts);
    inputs.temperatureCelsius = temperature.getValue().in(Units.Celsius);
}
```

This is the function that actually updates the logging. `refreshAll` asks the motor for the newest values on every signal, then we copy those values into the inputs object. The `.in(...)` part is just converting into the units we want stored. canId gets set from constants since the motor doesn't report that itself.

You want to call this from the **logic layer** every loop so the logged values stay up to date:
```java Logic Class
    //might error once you add it, you'll need to build first to generate the autologged class
    private final ShooterInputsAutoLogged inputs = new ShooterInputsAutoLogged();

    public Shooter() {
        io = new ShooterIO();
        Scheduler.getDefault().addPeriodic(this::periodic); 
    }

    private void periodic() {
        io.updateInputs(inputs);
        Logger.processInputs("Shooter", inputs);
    }
```

The "addPeriodic" function in the Scheduler is a unique one as whatever function is added with it is ran in a loop forever, perfect for updating our inputs. We then need to tell the logger to actually log these values, which is what `Logger.processInputs("Shooter", inputs);` is for.



## Final Code

```java Hardware Class
package first.subsystems.shooter;

import com.ctre.phoenix6.BaseStatusSignal;
import com.ctre.phoenix6.CANBus;
import com.ctre.phoenix6.StatusSignal;
import com.ctre.phoenix6.controls.DutyCycleOut;
import com.ctre.phoenix6.hardware.TalonFX;

public class ShooterIO {

  @AutoLog
  public static class ShooterInputs {
    public int canId;
    public double positionRotations;
    public double velocityRotationsPerSec;
    public double supplyCurrentAmps;
    public double statorCurrentAmps;
    public double supplyVoltageVolts;
    public double motorVoltageVolts;
    public double temperatureCelsius;
  }

  private final TalonFX motor;

  private final DutyCycleOut dutyCycleOut = new DutyCycleOut(0).withEnableFOC(true);

  private final StatusSignal<Angle> position;
  private final StatusSignal<AngularVelocity> velocity;
  private final StatusSignal<Current> supplyCurrent;
  private final StatusSignal<Current> statorCurrent;
  private final StatusSignal<Voltage> supplyVoltage;
  private final StatusSignal<Voltage> motorVoltage;
  private final StatusSignal<Temperature> temperature;

  public ShooterIO() {
    motor = new TalonFX(1, new CANBus("*"));

    position = motor.getPosition();
    velocity = motor.getVelocity();
    supplyCurrent = motor.getSupplyCurrent();
    statorCurrent = motor.getStatorCurrent();
    supplyVoltage = motor.getSupplyVoltage();
    motorVoltage = motor.getMotorVoltage();
    temperature = motor.getDeviceTemp();
  }

  public void updateInputs(ShooterInputs inputs) {
    BaseStatusSignal.refreshAll(
        position, velocity, supplyCurrent, statorCurrent, supplyVoltage, motorVoltage, temperature);

    inputs.canId = Constants.SHOOTER_MOTOR_ID;
    inputs.positionRotations = position.getValue().in(Units.Rotations);
    inputs.velocityRotationsPerSec = velocity.getValue().in(Units.RotationsPerSecond);
    inputs.supplyCurrentAmps = supplyCurrent.getValue().in(Units.Amps);
    inputs.statorCurrentAmps = statorCurrent.getValue().in(Units.Amps);
    inputs.supplyVoltageVolts = supplyVoltage.getValue().in(Units.Volts);
    inputs.motorVoltageVolts = motorVoltage.getValue().in(Units.Volts);
    inputs.temperatureCelsius = temperature.getValue().in(Units.Celsius);
  }

  public void spinMotor(double dutyCycle) {
    motor.setControl(dutyCycleOut.withOutput(dutyCycle));
  }

  public void stop() {
    motor.setControl(dutyCycleOut.withOutput(0.0));
  }
}

```
```java Logic Class
package first.subsystems.shooter;

import org.littletonrobotics.junction.Logger;
import org.wpilib.command3.Command;
import org.wpilib.command3.Mechanism;
import org.wpilib.command3.Scheduler;

public class Shooter extends Mechanism {
  private final ShooterIO io;
  private final ShooterInputsAutoLogged inputs = new ShooterInputsAutoLogged();

  public Shooter() {
    io = new ShooterIO();
    Scheduler.getDefault().addPeriodic(this::periodic);
  }

  private void periodic() {
    io.updateInputs(inputs);
    Logger.processInputs("Shooter", inputs);
  }

  public Command spin(double dutyCycle) {
    return runRepeatedly(() -> io.spinMotor(dutyCycle)).named("ShooterSpin");
  }

  public Command stop() {
    return runRepeatedly(io::stop).named("ShooterStop");
  }
}
```



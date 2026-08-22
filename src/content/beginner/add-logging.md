# Basic Logging

Logging is absolutely a critical: You can't fix what you can't see. Luckily, there already exists many solutions that are plug and play. This guide already sets up AdvantageKit logging if you've followed along since it's supported and you can plug in any logging structure to be displayed (Doglog, Akit, etc.).

## Example Logging

Logging is really simple, just set up AdvantageKit as explained in [first-project](/beginner/first-project). Then, just add these lines to your subsystem and you'll start seeing your logged field in AdvantageScope.

```java Logic Class
public Shooter() {
  Scheduler.getDefault().addPeriodic(this::periodic); 
}

private void periodic() {
  Logger.recordOutput("Shooter/Motor", <whatever_value_you_need_logged>);
}
```
The ```recordOutput``` function takes in two values, the key and a value. The key is the folder that the value goes to, kind of like a file system. If you need to log more values it's as simple as adding another ```recordOutput``` call.

## How to Get Values

If you're using a CTRE device, you'll need to use ```StatusSignal``` objects to get values out of your motors. They're just objects that get values stored on the motor controllers, which gives you more accurate measurements as the motor controller is on a much faster polling rate than your Systemcore/RoboRio.

```java Hardware Class
public class ShooterIO {
  // previous code

  private final StatusSignal<Angle> position;
  private final StatusSignal<AngularVelocity> velocity;
  private final StatusSignal<Current> statorCurrent;
  private final StatusSignal<Voltage> motorVoltage;

  public ShooterIO() {
    motor = new TalonFX(1, new CANBus("*"));

    position = motor.getPosition(); 
    velocity = motor.getVelocity();
    statorCurrent = motor.getStatorCurrent();
    motorVoltage = motor.getMotorVoltage();
  }

  public void updateInputs() {
    // Make sure to put all values into a refreshAll to reduce loop times.
    // Doing it in one read gives us an O(1) time while doing multiple gives O(n) time.
    BaseStatusSignal.refreshAll(
        position, velocity, supplyCurrent, statorCurrent, supplyVoltage, motorVoltage, temperature); 
  }

  // This is to retreive our values. There is a better way to do this with less boilerplate, but it's in advanced-logging
  public double getPositionRot(){
    return position.getValue().in(Units.Rotations);
  }
  public double getVelocityRPS(){
    return velocity.getValue().in(Units.RotationsPerSecond);
  }
  public double getStatorCurrentAmps(){
    return statorCurrent.getValue().in(Units.Amps);
  }
  public double getMotorVoltageVolts(){
    return motorVoltage.getValue().in(Units.Volts);
  }

  // previous code
}
```
If you're on other control systems, you should just be able to poll it directly with a motor.getVelocity(). (Dunno yet, need to update)

Now try to put all of these things together to log the shooter spinning!

## Final Code

```java Hardware Class
package first.subsystems.shooter;

import com.ctre.phoenix6.BaseStatusSignal;
import com.ctre.phoenix6.CANBus;
import com.ctre.phoenix6.StatusSignal;
import com.ctre.phoenix6.controls.DutyCycleOut;
import com.ctre.phoenix6.hardware.TalonFX;

public class ShooterIO {

  private final TalonFX motor;

  private final DutyCycleOut dutyCycleOut = new DutyCycleOut(0).withEnableFOC(true);

  private final StatusSignal<Angle> position;
  private final StatusSignal<AngularVelocity> velocity;
  private final StatusSignal<Current> statorCurrent;
  private final StatusSignal<Voltage> motorVoltage;

  public ShooterIO() {
    motor = new TalonFX(1, new CANBus("*"));

    position = motor.getPosition(); 
    velocity = motor.getVelocity();
    statorCurrent = motor.getStatorCurrent();
    motorVoltage = motor.getMotorVoltage();
  }

  public void updateInputs() {
    BaseStatusSignal.refreshAll(
        position, velocity, statorCurrent, motorVoltage);
  }


  public void spinMotor(double dutyCycle) {
    motor.setControl(dutyCycleOut.withOutput(dutyCycle));
  }
  public void stop() {
    motor.setControl(dutyCycleOut.withOutput(0.0));
  }

  public double getPositionRot(){
    return position.getValue().in(Units.Rotations);
  }
  public double getVelocityRPS(){
    return velocity.getValue().in(Units.RotationsPerSecond);
  }
  public double getStatorCurrentAmps(){
    return statorCurrent.getValue().in(Units.Amps);
  }
  public double getMotorVoltageVolts(){
    return motorVoltage.getValue().in(Units.Volts);
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



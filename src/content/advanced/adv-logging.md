
# Advanced Logging


If you're logging multiple different values, such as for a motor, this becomes really tedious and hard to make clean. So, AdvantageKit gives us a really nice framework 


## AdvantageKit Logging
Logging with AdvantageKit is really easy. Create a class like so: 

```java Logging Class
@AutoLog
public static class MotorValues {
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
This class should define all the values that you want logged. The neat thing about AdvantageKit is the @AutoLog annotation above the class, it does all the storing of data auto-magically for you by generating an AutoLogged class to store values.

Next, we need to add a way for the motor to report its values to be logged. The StatusSignal allows us to access the values that a motor has stored. 

> ![IMPORTANT]
> StatusSignals are unique to Falcon products, if you're using NEOs or other motors, I believe you can skip this.

Simply add these objects to the class:
```java Hardware Class
private final StatusSignal<Angle> position;
private final StatusSignal<AngularVelocity> velocity;
private final StatusSignal<Current> supplyCurrent;
private final StatusSignal<Current> statorCurrent;
private final StatusSignal<Voltage> supplyVoltage;
private final StatusSignal<Voltage> motorVoltage;
private final StatusSignal<Temperature> temperature;
```
CANid in this case is not a value that the motor reports as a StatusSignal so it's not included.

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
public void updateValues(MotorValues values){
    BaseStatusSignal.refreshAll(
        position, velocity, supplyCurrent, statorCurrent, supplyVoltage, motorVoltage, temperature); 

    values.canId = Constants.SHOOTER_MOTOR_ID;
    values.positionRotations = position.getValue().in(Units.Rotations);
    values.velocityRotationsPerSec = velocity.getValue().in(Units.RotationsPerSecond);
    values.supplyCurrentAmps = supplyCurrent.getValue().in(Units.Amps);
    values.statorCurrentAmps = statorCurrent.getValue().in(Units.Amps);
    values.supplyVoltageVolts = supplyVoltage.getValue().in(Units.Volts);
    values.motorVoltageVolts = motorVoltage.getValue().in(Units.Volts);
    values.temperatureCelsius = temperature.getValue().in(Units.Celsius);
}
```

This is the function that actually updates the logging. `refreshAll` asks the motor for the newest values on every signal, then we copy those values into the values object. The `.in(...)` part is just converting into the units we want stored. canId gets set from constants since the motor doesn't report that itself.

You want to call this from the **logic layer** every loop so the logged values stay up to date:
```java Logic Class
    //You'll need to build your project (in command palette) first to generate the autologged class
    private final MotorValuesAutoLogged values = new MotorValuesAutoLogged();

    public Shooter() {
        io = new ShooterIO();
        Scheduler.getDefault().addPeriodic(this::periodic); 
    }

    private void periodic() {
        io.updateValues(values);
        Logger.processInputs("Shooter", values);
    }
```

The "addPeriodic" function in the Scheduler is a unique one as whatever function is added with it is ran in a loop forever, perfect for updating our inputs. We then need to tell the logger to actually log these values, which is what `Logger.processInputs("Shooter", values);` is for.
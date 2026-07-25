# Writing A Hardware Layer {#writing-hardware-layer}

The moment that everyone's been waiting for: writing code! We're starting on the hardware as we need it before writing the logic part of the robot.

## Writing Hardware {#writing-hardware}

Create a class by right-clicking the folder you want the file in and click new Java file, then class. You can name the file anything, but I will name it ShooterIO.

We first want to begin by defining our hardware. In this case, the simplest subsystem would just be a singular motor. We can also apply some configuration values to it.

```java
private final TalonFX motor;

public ShooterIO() {
    /*
    This motor configuration is simply for this section, 
    for best practices, all of the constants (the numbers)
    should be in a Constants.java file and imported.
    */
    motor = new TalonFX(1, new CANBus("*")); //use your motor id and CANBus name

    TalonFXConfiguration config = new TalonFXConfiguration();
    config.MotorOutput.NeutralMode = NeutralModeValue.Coast;
    config.CurrentLimits.StatorCurrentLimitEnable = true;
    config.CurrentLimits.StatorCurrentLimit = 60.0;
    motor.getConfigurator().apply(config);
}
```

Next, we need to add functions to make the motor actually spin. Simply add a function like so:

```java
private final DutyCycleOut dutyCycleOut = new DutyCycleOut(0).withEnableFOC(true);

public void spinMotor(double dutyCycle) {
    motor.setControl(dutyCycleOut.withOutput(dutyCycle));
}
```

### Code Breakdown 

```java
private final /*<--variable modifiers*/ TalonFX /*<--class*/ motor /*<--object*/;

public ShooterIO() {
    /*
    This motor configuration is simply for this section, 
    for best practices, all of the constants (the numbers)
    should be in a Constants.java file and imported.
    */
    motor = new TalonFX(1, new CANBus("*"));

    //Configurations!
    TalonFXConfiguration config = new TalonFXConfiguration();
    config.MotorOutput.NeutralMode = NeutralModeValue.Coast; //changes the behavior when we set power to 0
    config.CurrentLimits.StatorCurrentLimitEnable = true;
    config.CurrentLimits.StatorCurrentLimit = 30.0; //limits the amount of current to the motor
    motor.getConfigurator().apply(config); //applies the configs
}
```

We first being with creating our motor object (the TalonFX). Think of objects like an animal, you can describe them via variables and can also do actions via functions. 

We then intialize the TalonFX object in the constructor. A good mental model is to imagine the constructor being where you create all the devices/devices you need. Each class has a constructor that defines what is required to make an object of that class, so we put all the initalization we need to here. 

The configuration is then applied below, this is where you can set if your want your motor to brake when at 0 power or not, what the limits on the amount of power you want your motors to use, etc. The CTRE documentation has a whole list on the configs that are available.

```java
private final DutyCycleOut dutyCycleOut = new DutyCycleOut(0); 

public void spinMotor(double dutyCycle) /*<--this is the function's input*/ {
    motor.setControl(dutyCycleOut.withOutput(dutyCycle)); //<-- this is where we set the motor's control.
}
```

This is the code that actually controls the motors. The first line creates a DutyCycle object, which is the datatype that is needed to talk to the motor. There's a lot of different control methods that are mentioned in [add in url later].

Next, we create a function that sets the control of the motor. We take the duty cycle parameter in and pass it to the motor. This is literally just a wrapper and we do this so that when programming in the sotware we don't need to worry about defining the motor object, we just call the function.

## Final Code

```java
package first.subsystems.shooter;

import com.ctre.phoenix6.controls.DutyCycleOut;
import com.ctre.phoenix6.hardware.TalonFX;
import com.ctre.phoenix6.configs.TalonFXConfiguration;
import com.ctre.phoenix6.signals.NeutralModeValue;

public class ShooterIO(){
    private final TalonFX motor;

    public ShooterIO() {
        motor = new TalonFX(1, new CANBus("*"));

        TalonFXConfiguration config = new TalonFXConfiguration();
        config.MotorOutput.NeutralMode = NeutralModeValue.Coast;
        config.CurrentLimits.StatorCurrentLimitEnable = true;
        config.CurrentLimits.StatorCurrentLimit = 30.0;
        motor.getConfigurator().apply(config);
    }

    private final DutyCycleOut dutyCycleOut = new DutyCycleOut(0); 

    public void spinMotor(double dutyCycle){
        motor.setControl(dutyCycleOut.withOutput(dutyCycle));
    }
}
```





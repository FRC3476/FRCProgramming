# Add Simulation
Simulation might seem like an extremely difficult task to do, but in reality in modern day FRC it's really not.
## What is Simulation
Simulation is having your computer run a virtual motor. It shouldn't be used for any physical constants, such as PID as you're never going to be as physically accurate as the physical world, but rather should be used as a way to verify if your code has any bugs.

An example would be an elevator. Let's say that the elevator should have 3 position, one at 22 inches up, one at 0 inches, and one at 11 inches. If we wanted to test if the code had any issues, you would just simulate it, press the buttons to go to those 3 positions and see if the simulation goes to the points correctly. If it does, then your code is bug free (like 100%). If it doesn't work, it's not your logic that is the issue, but rather tuning and such.

![The flywheel goes to its half free speed which is what I want. (Krakenx60 freespeed is 6000rpm)](../assets/beginner/simulation-example.png)

## Adding Simulation To Our Code
Our simulation has two different parts, the TalonFX simulated state and the mathematical physical model. The model updates the state's position and stuff so it can be logged, and the state passes on the movement functions to be calculated in the model.

The simulation piggiebacks off of the logging that we had previously. 

We need to first create the simulated state of the TalonFX, so within the constructor, add:
```java Hardware Class
motorSim = motor.getSimState();
```
Next, we need to create the physical model.
```java Hardware Class
//we create 1 Krakenx60 for our simulation to power our simulation subsystem.
DCMotor gearbox = DCMotor.getKrakenX60(1); 

// This makes the actual model object. 
// There are many different Model types that you can use, 
// but for most cases the singleJointedArm model works for spinning objects 
model =
    new DCMotorSim(
        Models.singleJointedArmFromPhysicalConstants(
            gearbox, Constants.SHOOTER_MOI, Constants.SHOOTER_GEARING),
        gearbox); 
```

Next in ```updateInputs()``` we need to update the model and state and vice versa.
```java Hardware Class
if (RobotBase.isSimulation()) {
    motorSim.setSupplyVoltage(RobotController.getBatteryVoltage()); //sets the amount of voltage the motor gets
    sim.setInputVoltage(motorSim.getMotorVoltage()); //sets how much voltage the model gets
    sim.update(0.02); //how fast the model updates in seconds (should be a constant)

    double mechanismRotations =
        Units.Radians.of(sim.getAngularPosition()).in(Units.Rotations);
    double mechanismRps =
        Units.RadiansPerSecond.of(sim.getAngularVelocity()).in(Units.RotationsPerSecond);

    motorSim.setRawRotorPosition(mechanismRotations * Constants.SHOOTER_GEARING); //updates the simulated motor state's position
    motorSim.setRotorVelocity(mechanismRps * Constants.SHOOTER_GEARING); //updates the simulated motor state's velocity
}
```
The motorSim object updates the real motor's StatusSignals when we're in a simulation, meaning that all of our previous logging works. It also means that we have to update it if we want a proper simulation.

## How to Simulates
Simulating is pretty easy, simply click the WPILib symbol and click the Simulate Robot Code option. Once the code builds, click the Sim GUI. You make sure to enable Desktop Support in your build.gradle. After that open AdvantageScope and connect to the simulation with it. 

To add keyboard controls in the sim, assign your keyboard to the joystick number in your code like so: 
![Simulation Controls](../assets/beginner/sim-controls.png)

After that, make sure to enable teleop to actually start the code:
![Enable Teleop Sim](../assets/beginner/enable-teleop-sim.png)


## Final Code
```java Hardware Class
package first.subsystems.shooter;

import com.ctre.phoenix6.BaseStatusSignal;
import com.ctre.phoenix6.CANBus;
import com.ctre.phoenix6.StatusSignal;
import com.ctre.phoenix6.controls.DutyCycleOut;
import com.ctre.phoenix6.hardware.TalonFX;
import com.ctre.phoenix6.sim.TalonFXSimState;
import com.revrobotics.spark.SparkMax;
import com.revrobotics.spark.SparkLowLevel.MotorType;

import first.robot.Constants;
import org.littletonrobotics.junction.AutoLog;
import org.wpilib.framework.RobotBase;
import org.wpilib.math.system.DCMotor;
import org.wpilib.math.system.Models;
import org.wpilib.simulation.DCMotorSim;
import org.wpilib.system.RobotController;
import org.wpilib.units.Units;
import org.wpilib.units.measure.Angle;
import org.wpilib.units.measure.AngularVelocity;
import org.wpilib.units.measure.Current;
import org.wpilib.units.measure.Temperature;
import org.wpilib.units.measure.Voltage;

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

  private final TalonFXSimState motorSim;
  private final DCMotorSim sim;
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
    motorSim = motor.getSimState();

    DCMotor gearbox = DCMotor.getKrakenX60(1);

    sim =
        new DCMotorSim(
            Models.singleJointedArmFromPhysicalConstants(
                gearbox, Constants.SHOOTER_MOI, Constants.SHOOTER_GEARING),
            gearbox);

    position = motor.getPosition();
    velocity = motor.getVelocity();
    supplyCurrent = motor.getSupplyCurrent();
    statorCurrent = motor.getStatorCurrent();
    supplyVoltage = motor.getSupplyVoltage();
    motorVoltage = motor.getMotorVoltage();
    temperature = motor.getDeviceTemp();
  }

  public void updateInputs(ShooterInputs inputs) {
    if (RobotBase.isSimulation()) {
        motorSim.setSupplyVoltage(RobotController.getBatteryVoltage()); //sets the amount of voltage the motor gets
        sim.setInputVoltage(motorSim.getMotorVoltage()); //sets how much voltage the model gets
        sim.update(0.02); //how fast the model updates in seconds (should be a constant)

        double mechanismRotations =
            Units.Radians.of(sim.getAngularPosition()).in(Units.Rotations);
        double mechanismRps =
            Units.RadiansPerSecond.of(sim.getAngularVelocity()).in(Units.RotationsPerSecond);

        motorSim.setRawRotorPosition(mechanismRotations * Constants.SHOOTER_GEARING); //updates the simulated motor state's position
        motorSim.setRotorVelocity(mechanismRps * Constants.SHOOTER_GEARING); //updates the simulated motor state's velocity
    }

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
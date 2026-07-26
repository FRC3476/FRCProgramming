# Writing the Logic Layer {#writing-software}

Now is the layer which we start to expose all the functions to be used in the control layer. 

## Writing Logic 

```java Logic Class
public class Shooter extends Mechanism {
  private final ShooterIO io;

  public Shooter() {
    io = new ShooterIO();
  }

  public Command spin(double dutyCycle) {
    return runRepeatedly(() -> io.spinMotor(dutyCycle)).named("ShooterSpin");
  }

  public Command stop() {
    return runRepeatedly(() -> io.stop()).named("ShooterStop");
  }
}
```

The logic layer is simply another wrapper of the hardware layer to make it command-based. The structure is very similar to the hardware layer, with the ```io``` object being the "motor" in this case. 

### Code Breakdown
```java Logic Class
public class Shooter extends Mechanism
```
We extend the Mechanism class, which allows us to attach the commands defined here to attach to the scheduler. It's what allows this class to be a subsystem. DO NOT FORGET TO EXTEND THIS, makes for a really annoying debugging experience.

This code here is using the new Command framework, Commands v3, and so subsystems have been renamed to mechanism. The same concepts apply to both however. 

```java Logic Class
private final ShooterIO io;

public Shooter() {
    io = new ShooterIO();
}
```
We initialize the io object.

```java Logic Class
public Command spin(double dutyCycle) {
    return runRepeatedly(() -> io.spinMotor(dutyCycle)).named("ShooterSpin");
}
public Command stop() {
    return runRepeatedly(() -> io.stop()).named("ShooterStop");
}
```
This is the commands that we want the subsystem to have, what actions it's allowed to have. 

You might notice the () -> [function] notation used within the runRepeatedly. In essence, it describes an object that is a function. 

We then need to name the functions. 

## Final Code
```java Logic Class
package first.subsystems.shooter;

import org.wpilib.command3.Command;
import org.wpilib.command3.Mechanism;
import org.wpilib.command3.Scheduler;

public class Shooter extends Mechanism {
  private final ShooterIO io;

  public Shooter() {
    io = new ShooterIO();
  }

  public Command spin(double dutyCycle) {
    return runRepeatedly(() -> io.spinMotor(dutyCycle)).named("ShooterSpin");
  }

  public Command stop() {
    return runRepeatedly(io::stop).named("ShooterStop");
  }
}
```

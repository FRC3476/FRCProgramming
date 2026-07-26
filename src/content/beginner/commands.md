# Commands

Before going onto the higher level parts of the program, we have to talk about commands.

## Command Structure

We have 4 main parts of the command structure:

1. Subsystems; Parts of your robot, mention in first-subsystem
2. Commands; These are actions that a robot can do, they can be made up of multiple subsystems or one subsystem
3. Robot Container; Where you create subsystems and the triggers for commands
4. Scheduler; This is the background loop that manages how commands are executed.



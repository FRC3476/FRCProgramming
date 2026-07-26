# Creating Your First Project {#first-project}

Before writing any line of code, there's a lot of stuff that goes prior to that which will make your life a lot easier. 

## Code Structure

FRC programming has 3 main layers, hardware, logic, and then controls. 



## Use Logging {#logging}

This is probably the biggest thing I see teams missing is good logging. Logging is critical to really anything that you program, knowing where and how something went wrong is worth so much when you're debugging, especially during a competition. I cannot stress the importance of logging enough, it is sooooo freaking important and can cut down your debugging time in half.

I recommend using the AdvantageKit logger made by 6328, it's packaged with the WPILib install by default so you should have it installed already. It's also what this guide will be using. To use it, go to the [AdvantageKit installation docs](https://docs.advantagekit.org/getting-started/installation/existing-projects) and follow the instructions to make a **new** project.

Adding AdvantageKit into your project also allows for simulation, which is extremely useful for following this guide if you don't have a robot, and also useful during season since you can finish most of your code without the robot.

![AdvantageScope example](../assets/beginner/akitExample.png)

## Use Github (or any git hosting service) {#github}

Having your code on Github makes things really freaking easy to version control your code and to work with other team members. Another major benefit of putting your code on a provider is that you can share your code with other teams. If you need help, just paste your link to your Github repo (if it's public).

To make a repo, go to [github.com](https://github.com), click New Repository, and name it whatever you want and create the repo.

Then, open your local project in VS Code. From that project, run the code below in your terminal to link your local project repo with the online Github repo to start version controlling.

```bash
# Initialize the local directory as a Git repository.
git init

# Add files
git add .

# Commit your changes
git commit -m "First commit"

# Add remote origin
git remote add origin <Remote repository URL>
# <Remote repository URL> looks like: https://github.com/user/repo.git.  
# In Github, this link is found by clicking the green Code button and copying the URL.

# Verifies the new remote URL
git remote -v

# Push your changes
git push origin main
```

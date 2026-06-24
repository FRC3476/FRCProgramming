import type { CurriculumSection } from "./curriculum";
import howtobrowser from "../assets/git/howtobrowser.gif";

export const introduction: CurriculumSection[] = [
    {
        id: 'introduction',
        title: 'Introduction',
        content:[
            { type: 'text', body: "Welcome to the FRC Programming! This is a basic guide that hopefully teaches not just how to write FRC code, but how to write good code in general."},
            {type: 'text', body: "Most programming guides cover the basics of how to write FRC code like how to run a motor and how PID works, but this is only a part of what programming is about. This guide will cover these topics, but also tools like how to properly use Git, how to organize your code to be more readable, and more. Hopefully this should make your experience during season a little better as the rest of the team gives you 3 days with the robot!"}
        ],

        subheadings: [
            {
                id: 'user-guide', 
                title: 'How to use this Website',
                content: [
                    {type: 'text', body: "You should be writing code BY HAND as you follow this guide, don't just copy paste code. Thus, this website was made with the intent with being viewed inside of VS Code (or whatever IDE you prefer) with the integrated browser."},
                    {type: 'gif', src: howtobrowser,  caption: 'How to view this site in VS Code browser'},
                    {type: 'text', body: "This way, you can code while viewing this guide in a small panel so you don't need to switch windows constantly."},
                    {type: 'text', body: "If you don't have access to a robot while programming, don't worry! FRC has simulation built into it. You can follow all the modules within this guide through your simulation - I recommend everyone reading this to do this actually since simulation is a lot faster than deploying code."}


                ]
            }
        ],

    }
];
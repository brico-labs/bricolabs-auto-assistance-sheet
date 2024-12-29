# bricolabs-auto-entry
This autogenerates a printable webpage that can be used in assistance control. This aids in not having to take hours fiddling with cell styles and 

It should be noted that code in this repo is non-generic and organization-tailored, which means that a refactor could be useful to genericize it so it can be used by more people. It is quick and dirty code so bear that in mind. Feel free to fork, as always ;)

It runs on NodeJS, using EJS templates that output a HTML file.

First install node (preferably using nvm!) 

Then clone the repo and:
```
$ npm install
```

Create a new directory called data/. Currently the code searches for two files: "members.csv" and "honorificMembers.csv". You, as the current secretary, should download two pages as CSVs from the member list spreadsheet and place. This directory is intentionally excluded from the .gitignore and should never be included otherwise.

```
node auto-entry.js
```

This will generate a file in the output/ directory which can be served or just opened via your fav browser, then printed using those weird things called 2D printers.

Will this code get obsoleted out by finer means of access registering? Probably. But it has been fun not needing to use everything and the kitchen sink just to generate HTML based on templates.

- msrl

There's a cleanup function that extracts the necessary data. If tailoring to another org, that's a good starting point.

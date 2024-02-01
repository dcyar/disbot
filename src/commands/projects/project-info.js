const { SlashCommandBuilder } = require('discord.js');
const projects = require('../../data/projects.json');

const data = new SlashCommandBuilder()
    .setName('project-info')
    .setDescription('Search for a project info')
    .addStringOption(option =>
        option.setName('name')
            .setDescription('Name of the project')
            .setRequired(true)
            .setAutocomplete(true)
    );

const run = ({ interaction }) => {
    const projectChoice = interaction.options.getString('name');

    const project = projects.find(p => p.name === projectChoice);

    interaction.reply(`Project: ${project.name}`);
}

const autocomplete = ({interaction}) => {
    const focusedValue = interaction.options.getFocused();

    const filteredChoices = projects.filter(project => 
        project.name.toLowerCase().startsWith(focusedValue.toLowerCase())
    );

    const results = filteredChoices.map(project => ({
        name: project.name,
        value: project.name
    }));

    interaction
        .respond(results.slice(0, 10))
        .catch(() => {});
}

module.exports = { data, run, autocomplete };
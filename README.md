# magic-cards-grid

This is a coding exercise done by Alyssa Harding for Highspot

As requested, this exercise has been written as a drop-in ready WordPress plugin. 

INSTALLATION INSTRUCTIONS

1. Download the magic-cards-grid.zip repository here on GitHub

FROM YOUR WORDPRESS DASHBOARD

2. Visit ‘Plugins > Add New’
3. Click on 'Upload Plugin'
4. 'Browse' and upload the .zip repository you downloaded in step 1
5. Activate the plugin
6. Visit 'Pages > Add New' to create a new page
7. In the content editor place the shortcode '[magic_cards_grid]' where you'd like the cards to appear
8. Publish and view the page

PROJECT NOTES

Implementation requirements:
- create a (standalone) WordPress plugin
- use the REST API found here: https://api.magicthegathering.io/v1/cards (documentation: https://docs.magicthegathering.io/)
- display cards of 'type' = creature that have an 'imgURL' value
- use the API to sort the results alphabetically
- show a loading gif when communicating with the API
- append additional results to the bottom of the page
- don't load all results at once - I chose to display results in 20 card chunks (infinite load)
- design should be responsive
- each card should display at least: image (prominently), name, artist, set name, and original type - I chose to display (current) type and only to display original type if the original type was different from the current type.

describe('American - British Translator', () => {
	beforeEach(() => {
		cy.visit('https://american-british-translator.freecodecamp.rocks');
		cy.url().should('include', 'translator');
	});

	it('Displays Heading Text', () => {
		cy.contains('h1', 'American / British English').should('be.visible');
	});

	it('Translates to British English', () => {
		cy.get('#text-input')
			.should('have.attr', 'cols', 60)
			.and('have.attr', 'rows', 10)
			.type(
				"We decided to play hooky and had a party at my friend's condo.{enter}The parking lot was full.{enter}We ate all of the cotton candy."
			);

		cy.get('#locale-select')
			.select(0)
			.should('contain.text', 'American to British')
			.and('be.visible');

		cy.get('#translate-btn').should('have.value', 'Translate').click();

		cy.get('#translated-sentence').then((translated) => {
			cy.log(translated.text()).as('translatedText');
		});
		cy.get('@translatedText')
			.should('not.be.empty')
			.within(() => {
				cy.get('.highlight:eq(0)').should('have.text', 'bunk off');
				cy.get('.highlight:eq(1)').should('have.text', 'flat');
				cy.get('.highlight:eq(2)').should('have.text', 'car park');
				cy.get('.highlight:eq(3)').should('have.text', 'candy floss');
			});
	});

	it('It Translates to American English', () => {
		cy.get('#text-input')
			.clear()
			.should('be.empty')
			.and('not.have.attr', 'id', 'error-msg')
			.type(
				"I've just got bits and bobs in my bum bag.{enter}We watched the footie match for a while.{enter}Paracetamol takes up to an hour to work."
			);

		cy.get('#locale-select')
			.select('British to American')
			.should('have.value', 'british-to-american');

		cy.get('#translate-btn').should('have.attr', 'type', 'button').click();

		cy.get('.highlight').each((highlighted) => {
			cy.wrap(highlighted.text()).should('to.be.oneOf', [
				'soccer',
				'Tylenol',
				'odds and ends',
				'fanny pack',
			]);
		});
	});
});

import { dom } from './index.js';

let d;
const { querySelector } = document;
const { querySelectorAll } = document;

describe('dom', () => {
    [
        'final_dom_node_count', 'final_dom_nest_depth', 'final_html_size'
    ].forEach(
        (event) => it(
            `DOM metric ${event}`,
            async() => {
                const data = await dom();
                expect(data).to.have.property(event);
                expect(data[event]).to.be.a('number');
            }
        )
    );
    describe('check calculations', () => {
        before(() => {
            d = document.implementation.createHTMLDocument('my page');
            const ul = document.createElement('ul');
            new Array(10).fill().map(() => document.createElement('li')).forEach(
                (li) => ul.appendChild(li)
            );
            const article = document.createElement('article');
            const p = document.createElement('p');
            p.appendChild(document.createTextNode('Hello, test.'));
            const strong = document.createElement('strong');
            strong.appendChild(document.createTextNode('I hardly knew you'));
            p.appendChild(strong);
            article.appendChild(p);

            d.body.appendChild(ul);
            d.body.appendChild(article);
        });

        beforeEach(() => {
            document.querySelector = (...args) => d.querySelector(...args);
            document.querySelectorAll = (...args) => d.querySelectorAll(...args);
        });

        afterEach(() => {
            document.querySelector = querySelector;
            document.querySelectorAll = querySelectorAll;
        });

        it('test the setup', () => {
            expect(d.querySelectorAll('body ul li')).to.have.lengthOf(10);
            expect(d.querySelector('body article p strong')).not.to.equal(null);
        });

        it('Should return the total number of child DOM elements', async() => {
            const { final_dom_node_count } = await dom();
            expect(final_dom_node_count).to.equal(18);
        });

        it('Should return the depth of deepest DOM tree', async() => {
            const { final_dom_nest_depth } = await dom();
            expect(final_dom_nest_depth).to.equal(5);
        });

        it('Should return the character count of the HTML document', async() => {
            const { final_html_size } = await dom();
            expect(final_html_size).to.equal(232);
        });
    });
});

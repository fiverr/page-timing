import { fps } from '.';

const { requestAnimationFrame } = window;

describe('fps', () => {
    afterEach(() => {
        window.requestAnimationFrame = requestAnimationFrame;
    });
    it('should measure browser FTP', async() => {
        const result = await fps();
        expect(result).to.be.at.least(29);
        expect(result).to.be.at.most(62);
    });
    it('should return undefined when not supported', async() => {
        delete window.requestAnimationFrame;
        const result = await fps();
        expect(result).to.be.undefined;
    });
});

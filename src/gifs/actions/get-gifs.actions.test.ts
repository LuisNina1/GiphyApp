import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs.actions";
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../test/giphy.response.data";


describe('getGifsByQuery', () => {
    // test('should return a list of gifs', async () => {
    //     const gifs = await getGifsByQuery('goku');
    //     const [gif1] = gifs;

    //     expect(gifs.length).toBe(10)

    //     expect(gif1).toEqual({
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         height: expect.any(Number),
    //         width: expect.any(Number)
    //     })
    // })
    let mock = new AxiosMockAdapter(giphyApi);
    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyApi);
    })
    test('should retrun a list of gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock)
        const gifs = await getGifsByQuery('goku')
        expect(gifs.length).toBe(10)
        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string')
            expect(typeof gif.title).toBe('string')
            expect(typeof gif.url).toBe('string')
            expect(typeof gif.height).toBe('number')
            expect(typeof gif.width).toBe('number')
        })
    })
    test('should retrun a empty  list of gifs if query if empty', async () => {
        mock.restore()
        const gifs = await getGifsByQuery('')
        expect(gifs.length).toBe(0)
    })
    test('Should hanlde error when the API returns an errors', async () => {
        const consoleErroSpy = vi.spyOn(console, 'error')
        .mockImplementation( () => {})
        mock.onGet('/search').reply(400, {
            data: {
                message: 'bad request'
            }
        })
        const gifs = await getGifsByQuery('goku')
        console.log(gifs)

        expect(gifs.length).toBe(0)
        expect(consoleErroSpy).toHaveBeenCalled();
        expect(consoleErroSpy).toHaveBeenCalledWith(expect.anything())

    })
})
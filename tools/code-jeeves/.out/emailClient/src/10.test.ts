

import selectEmail from './10..ts'
import { expect } from 'jest'

describe('When selectEmail is called', () => {
    describe('Given a list of emails and a selection criteria', () => {
        const emails = ['example@gmail.com', 'user@hotmail.com', 'test@yahoo.com']
        const criteria = { domain: 'gmail.com' }

        describe('When the selection criteria is valid', () => {
            it('Should return an email with the specified domain', () => {
                const result = selectEmail(emails, criteria)
                expect(result).toBe('example@gmail.com')
            })

            it('Should not return an email with a different domain', () => {
                const result = selectEmail(emails, criteria)
                expect(result).not.toBe('user@hotmail.com')
            })
        })

        describe('When the selection criteria is invalid', () => {
            it('Should throw an error', () => {
                const criteria = { domain: 'invalid.com' }
                expect(() => selectEmail(emails, criteria)).toThrow()
            })
        })
    })
})

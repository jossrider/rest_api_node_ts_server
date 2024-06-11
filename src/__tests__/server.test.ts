import request from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

describe('GET/api', () => {
  it('should send back a json response', async () => {
    const rest = await request(server).get('/api')
    expect(rest.status).toBe(200)
    expect(rest.headers['content-type']).toMatch(/json/)
    expect(rest.body.msg).toBe('Desde API')

    expect(rest.status).not.toBe(404)
    expect(rest.body.msg).not.toBe('desde api')
  })
})

jest.mock('../config/db')

describe('connectDB', () => {
  it('should handle database connect error', async () => {
    jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Error al conectar a la BD'))
    const consoleSpy = jest.spyOn(console, 'log')
    await connectDB()
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectar a la BD'))
  })
})

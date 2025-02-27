import {test, expect } from 'playwright/test'

test.describe('Happy case', async()=>{
    test('User - method: get',({request})=>{
        request.post('')
    } )
    test('GET /endpoint', async ({ request }) => {
    const GetUserresponse = await request.get('https://random-data-api.com/api/v2/users')
    {
        
    }
    expect(GetUserresponse.status()).toBe(200);
    // Các kiểm tra thêm
  });
    
})


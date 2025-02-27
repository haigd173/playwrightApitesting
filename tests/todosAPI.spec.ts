import {test, expect } from 'playwright/test'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

//METHOD : GET
test.describe('METHOD: GET - TODOS', async()=>{
    test('User - method: get',({request})=>{
        request.post('')
    } )
    test('get todo list', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/todos/`);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200)
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody[0]).toHaveProperty('userId')
    responseBody.forEach(todo => {
        expect(todo).toHaveProperty('userId');
        expect(todo.userId).toEqual(expect.any(Number));
        expect(todo).toHaveProperty('id');
        expect(todo.id).toEqual(expect.any(Number));
        expect(todo).toHaveProperty('title');
        expect(todo.title).toEqual(expect.any(String));
        expect(todo).toHaveProperty('completed');
        expect(todo.completed).toEqual(expect.any(Boolean));
    });


  });
  test('get unit todo with ID = 2', async ({ request }) => {
    const id = 2
    const response = await request.get(`${API_BASE_URL}/todos/${id}`);
    const responseBody = await response.json();
    console.log(`Status: ${response.status()}`);
    console.log(`Headers:`, await response.headers());
    console.log(`Body:`, await response.json());
    expect(response.status()).toBe(200)
    expect(responseBody.userId).toEqual(expect.any(Number))
    expect(responseBody.id).toEqual(expect.any(Number));
    expect(responseBody.title).toEqual(expect.any(String));
    expect(responseBody.completed).toEqual(expect.any(Boolean));
  })
  test('Get unit todo with ID does not exist', async ({ request }) => {
    const id = 534543
    const response = await request.get(`${API_BASE_URL}/todos/${id}`);
    const responseBody = await response.json();
    expect(response.status()).toBe(404)
    expect(responseBody).toEqual({})  
  })
    
})
// METHOD: POST
test.describe('METHOD POST: todos', async()=>{
  test('Post a new todos', async ({ request }) => {
    const PostData = {
    "userId": 1,
        "title": "fugiat veniam minus",
        "completed": false
    }
    await request.delete(`${API_BASE_URL}/todos/?title=fugiat veniam minus `)   
    const response = await request.post(`${API_BASE_URL}/todos/`,{
      data : {PostData}
    });
    console.log(response.status())
    console.log(response.headers())
 
    const responseBody = await response.json();
    expect(response.status()).toBe(201)
  
  })
})


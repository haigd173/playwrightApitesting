
import {test, expect } from 'playwright/test'
import 'pw-api-plugin'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'


//METHOD : GET
test.describe('METHOD: GET:  todos', async()=>{
    test('get todo list', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/todos/`);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200)
    expect(Array.isArray(responseBody)).toBeTruthy();  
    responseBody.slice(0,10).forEach( todo  => {
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
  test('Get a todo item with ID does not exist', async ({ request }) => {
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
        "title": "what are you doing here",
        "completed": false
    }
    await request.delete(`${API_BASE_URL}/todos/`,{
      params :PostData
    })   
    const response = await request.post(`${API_BASE_URL}/todos`,{
      data : PostData
    });
    const responseBody = await response.json();

    console.log(response.status())
    console.log(response.headers())
    console.log('BODY',responseBody)  
    expect(response.status()).toBe(201)
    expect( responseBody.title).toEqual(PostData.title)
    expect( responseBody.userId).toEqual(PostData.userId)
    expect(responseBody.completed).toEqual(PostData.completed) 
  })
})
// METHOD : DELETE
test.describe('METHOD : DELETE todos', async() =>{
  test('Delete a items on todos',  async({request})=>{
    const DeleteID = 24
    const response = await request.delete(`${API_BASE_URL}/todos/${DeleteID}`,)
    const responseBody = await response.json()
    console.log('status',await response.status())
    console.log('header', await response.headers())
    console.log('Body:', responseBody)

    const status = await response.status();
    expect(status === 200 || status === 204).toBeTruthy(); //cách 1 để kiểm tra 1 trong 2 status 
    expect([200, 204]).toContain(response.status()); //cách 2 

  })
  
  test(' Delete a items no exits in todos',  async({request})=>{
    const DeleteID = 20043254023
    const response = await request.delete(`${API_BASE_URL}/todos/${DeleteID}`)
    const responseBody = await response.json()
    const status = await response.status();
    expect(await response.status()).toBe(200)

  })
})
test.describe('METHOD :PUT todos ', async ()=>{
  test(' Delete a items no exits in todos',  async({request})=>{
    const putID = 24
    const putdata = {
      "userId": 1,
        "title": "what are you doing here",
        "completed": false
    }
    const response = await request.put(`${API_BASE_URL}/todos/${putID}`,{
      data:putdata
    })
    const responseBody = await response.json()
    const status = await response.status();
    console.log('status', response.status())
    console.log('Body', await response.json())
    expect(await response.status()).toBe(200)

  })
})


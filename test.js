const supertest = require('supertest');
const app = require('./app');
const model = require('./models/index');

const user = {
    id: 2,
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
};
let token;
let refreshToken;
afterAll(async () => {
    await model.tokens.destroy({ where: { data_token: refreshToken } });
});
test('POST /api/auth/login ', async () => {
    const data = { email: user.email, password: user.password };

    await supertest(app).post('/api/auth/login')
        .send(data)
        .expect(200)
        .then((response) => {
            expect(response.body.data.name).toBe(user.name);
            expect(response.body.data.userId).toBe(user.id);
            token = response.body.data.accessToken;
            refreshToken = response.body.data.refreshToken;
        });
});
test('GET /api/departments', async () => {
    const departments = await model.departments.findAll();
    await supertest(app)
        .get('/api/departments')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(response.body.data.length).toBe(departments.length);
            // Check data
            expect(response.body.data[0].name).toEqual(departments[0].name);
            expect(response.body.data[0].description).toEqual(departments[0].description);
            expect(response.body.data[0].code).toEqual(departments[0].code);
            expect(response.body.data[0].address).toEqual(departments[0].address);
        });
});

// test('POST /api/departments', async () => {
//     const data = { name: 'Department 1', description: 'Lorem ipsum', address: 'Ha Noi', code: 'DE1', organizationLevel: 1, parent_id: null };

//     await supertest(app).post('/api/departments')
//         .send(data)
//         .expect(200)
//         .then(async (response) => {
//             // Check the response
//             expect(response.body.name).toBe(data.name);
//             expect(response.body.description).toBe(data.description);

//             // Check data in the database
//             const departments = await model.departments.findOne({ id: response.body.id });
//             expect(departments).toBeTruthy();
//             expect(departments.name).toBe(data.name);
//             expect(departments.description).toBe(data.description);
//         });
// });

// test('GET /api/departments/:id', async () => {
//     const post = await Post.create({ title: 'Post 1', content: 'Lorem ipsum' });

//     await supertest(app).get(`/api/departments/${post.id}`)
//         .expect(200)
//         .then((response) => {
//             expect(response.body.id).toBe(post.id);
//             expect(response.body.title).toBe(post.title);
//             expect(response.body.content).toBe(post.content);
//         });
// });

// test('PATCH /api/posts/:id', async () => {
//     const post = await Post.create({ title: 'Post 1', content: 'Lorem ipsum' });

//     const data = { title: 'New title', content: 'dolor sit amet' };

//     await supertest(app).patch(`/api/posts/${post.id}`)
//         .send(data)
//         .expect(200)
//         .then(async (response) => {
//             // Check the response
//             expect(response.body.id).toBe(post.id);
//             expect(response.body.title).toBe(data.title);
//             expect(response.body.content).toBe(data.content);

//             // Check the data in the database
//             const newPost = await Post.findOne({ _id: response.body.id });
//             expect(newPost).toBeTruthy();
//             expect(newPost.title).toBe(data.title);
//             expect(newPost.content).toBe(data.content);
//         });
// });

// test('DELETE /api/posts/:id', async () => {
//     const post = await Post.create({
//         title: 'Post 1',
//         content: 'Lorem ipsum',
//     });

//     await supertest(app)
//         .delete(`/api/posts/${post.id}`)
//         .expect(204)
//         .then(async () => {
//             expect(await Post.findOne({ _id: post.id })).toBeFalsy();
//         });
// });

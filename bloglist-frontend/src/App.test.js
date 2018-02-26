import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'

import blogService from './services/blogs'

// describe('<App />', () => {
//     let app
//     beforeAll(() => {
//         app = mount(<App />)
//     })

//     // it('renders all blogs it gets from backend', () => {
//     //     console.log('app is ', app)
//     //     app.update()
//     //     const blogComponents = app.find(Blog)
//     //     expect(blogComponents.length).toEqual(blogService.blogs.length)
//     // })

//     it('does not render blogs without login', () => {
//         console.log('app is ', app)
//         app.update()
//         const blogComponents = app.find(Blog)
//         expect(blogComponents.length).toEqual(0)
//     })
// })

describe('<App />', () => {
    let app

    const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    describe('when user is not logged', () => {

        let app
        // beforeAll(() => {
        //   app = mount(<App />)
        // })

        beforeEach(() => {
            console.log('here we are')
            app = mount(<App />)
            console.log('app  here is ', app)
        })

        it('only login form is rendered', () => {
            console.log('app is ', app)
            app.update()

            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(0)
        })
    })

    //     describe('when user is logged', () => {
    //       beforeEach(() => {
    //         app = mount(<App user={user}/>)
    //       })

    //       it('all notes are rendered', () => {
    //         app.update()
    //         const blogComponents = app.find(Blog)
    // expect(blogComponents.length).toEqual(blogService.blogs.length)
    //       })
    //     })
})
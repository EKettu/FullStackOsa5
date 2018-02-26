import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders details', () => {
        const blog = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }

        const blogComponent = shallow(<SimpleBlog blog={blog} />)
       // console.log(blogComponent.debug())

        const contentDiv = blogComponent.find('.details')
        //console.log(contentDiv.debug())

        expect(contentDiv.text()).toContain(blog.title)
    })
    it('clicking the button twice calls event handler twice', () => {
        const blog = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(<SimpleBlog 
            blog={blog}
            onClick={mockHandler} />
        )
       // console.log(blogComponent.debug())

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        expect(mockHandler.mock.calls.length).toBe(2)
    })

})
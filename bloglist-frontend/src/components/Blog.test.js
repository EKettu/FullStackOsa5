import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('after clicking name the details are displayed', () => {
        const blog = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
        
        const mockHandler = jest.fn()
        const blogComponent = shallow(<Blog blog={blog} />)

        const nameDiv = blogComponent.find('.name')
        expect(nameDiv.text()).toContain(blog.title)
        expect(nameDiv.text()).toContain(blog.author)
        expect(nameDiv.text()).not.toContain(blog.url)
        nameDiv.simulate('click')

        const contentDiv = blogComponent.find('.details')

        expect(contentDiv.text()).toContain(blog.url)
        expect(contentDiv.text()).toContain(blog.likes)
    })

})
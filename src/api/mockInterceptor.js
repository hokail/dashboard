// src/api/mockInterceptor.js
import boardMock from '../../mock/board.js'
import userMock from '../../mock/user.js'
import alarmHistoryListMock from '../../mock/alarmHistoryList.js'
import reportDispatchMock from '../../mock/reportDispatch.js'

const allMocks = [...boardMock, ...userMock, ...alarmHistoryListMock, ...reportDispatchMock]

const mockMap = {}
allMocks.forEach(mock => {
    const key = `${mock.method.toUpperCase()}:${mock.url}`
    mockMap[key] = mock.response
})

const originalFetch = window.fetch

window.fetch = async function (url, options = {}) {
    const method = (options.method || 'GET').toUpperCase()
    const key = `${method}:${url}`

    if (mockMap[key]) {
        let body = undefined
        if (options.body) {
            try {
                body = JSON.parse(options.body)
            } catch (e) { /* ignore */ }
        }
        const result = mockMap[key]({ body, query: {}, params: {} })
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    return originalFetch(url, options)
}
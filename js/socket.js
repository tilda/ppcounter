let socket = new ReconnectingWebSocket('ws://localhost:24050/ws')
let pp = document.getElementById('pp')
let hundred = document.getElementById('hundred-count')
let fifty = document.getElementById('fifty-count')
let miss = document.getElementById('miss-count')

socket.onopen = () => console.log('connected')
socket.onclose = event => {
    console.log('socket closed:', event)
    socket.send('Client Closed!')
}
socket.onerror = error => console.log('wtf just happened:', error)

socket.onmessage = event => {
    try {
        let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay
        pp.innerHTML = play.pp.current
        hundred.innerHTML = play.hits[100]
        fifty.innerHTML = play.hits[50]
        miss.innerHTML = play.hits[0]
    } catch (err) {
        console.log('WTF JSOI:KJmg;klfejgkldjsgk;ldfjkl:', error)
    }
}
let socket = new ReconnectingWebSocket('ws://localhost:24050/ws')
let pp = document.getElementById('pp')
let hundred = document.getElementById('hundred-count')
let fifty = document.getElementById('fifty-count')
let miss = document.getElementById('miss-count')
let counter = document.getElementById('counter')

socket.onopen = () => console.log('connected')
socket.onclose = event => {
    console.log('socket closed:', event)
    socket.send('Client Closed!')
}
socket.onerror = error => console.log('wtf just happened:', error)

socket.onmessage = event => {
    try {
        let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay
        // 2 = playing, 7 = results, 14 = MP results
        // TODO: find a better way to do this I HATE THIS SO MUCH
        // also apparently || didn't work for some reason so i had to use |
        if (menu.state === 2 | menu.state === 7 | menu.state === 14) {
            counter.classList.remove('animated-out')
            counter.classList.add('animated-in')
            pp.innerHTML = play.pp.current
            hundred.innerHTML = play.hits[100]
            fifty.innerHTML = play.hits[50]
            miss.innerHTML = play.hits[0]
        } else {
            counter.classList.remove('animated-in')
            counter.classList.add('animated-out')
        }
    } catch (err) {
        console.log('WTF JSOI:KJmg;klfejgkldjsgk;ldfjkl:', error)
    }
}
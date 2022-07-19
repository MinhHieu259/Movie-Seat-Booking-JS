const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const seats2 = document.querySelectorAll('.row .seat') // Để lấy hết index của ghế
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const numberSeatSelected = document.getElementById('numberSeat')

//Gọi hàm hiển thị giao diện
populateUI();
let ticketPrice = +movieSelect.value

//Lưu film và giá phim đang chọn
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Cập nhật tổng film chọn và giá
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected ')

    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats2].indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Lấy data từ LocalStore và hiển thị lên UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats2.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
    numberSeatSelected.innerHTML = ""
    if (JSON.parse(localStorage.getItem('selectedSeats')) != null) {
        JSON.parse(localStorage.getItem('selectedSeats')).forEach(indexSeat => {
            numberSeatSelected.innerHTML += '<li>' + indexSeat + '</li>'
        })
    } 
}

//Xử lý chọn film
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
    populateUI()
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }
    updateSelectedCount()
    populateUI()
})

updateSelectedCount()


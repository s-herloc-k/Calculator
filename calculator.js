const submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    calculate(e)
})

function calculate(e) {
    e.preventDefault()

    let labels = []
    let balances = []

    let startingBalance = parseInt(document.querySelector('#startingBalance').value)
    const expectedReturn = parseInt(document.querySelector('#expectedReturn').value) / 100
    const monthlyDeposit = parseInt(document.querySelector('#monthlyDeposit').value)
    const duration = parseInt(document.querySelector('#duration').value)
    const monthlyReturn = expectedReturn / 12

    if (!startingBalance || !expectedReturn || !monthlyDeposit || !duration) {
        return
    }

    showGrowthDiv()
    buildValues(labels, balances, duration, startingBalance, monthlyReturn, monthlyDeposit)
    createChart(labels, balances)
}

function showGrowthDiv() {
    document.querySelector('#report-section').style.opacity = 1
    document.querySelector('#report-section').style.height = 'inherit'
}

function buildValues(labels, balances, duration, startingBalance, monthlyReturn, monthlyDeposit) {
    for (let i = 0; i <= duration * 12; i++) {

        startingBalance = startingBalance * (1 + monthlyReturn) + monthlyDeposit

        if (i % 12 === 0) {
            const year = i / 12
            balances.push(startingBalance.toFixed(2))
            labels.push(`Year ${year}`)

            balanceEnd = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }).format(startingBalance)
        }
    }
    document.querySelector('#totalValue').innerHTML = `Загальний дохід після ${duration} років: <span>${balanceEnd}</span>`
}

function createChart(labels, balances) {
    document.getElementById('growthChart').remove()

    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'growthChart')
    document.querySelector('#chartContainer').appendChild(canvas)

    const ctx = document.getElementById('growthChart');
    var growthChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Growth',
                data: balances,
                borderColor: '#f5f5f5',
                backgroundColor: 'rgba(50, 200, 0, .3)',
                borderWidth: 10,
                borderRadius: 2,
                hoverBorderWidth: 0,
            },],
        },
        options: {
            legend: {
                display: false,
            },
        },
    })
}
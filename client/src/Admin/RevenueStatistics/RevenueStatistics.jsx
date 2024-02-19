import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import LodersBody from '../../pages/assets/Common/LodersBody';

const RevenueStatistics = () => {
    const [basicCount, setBasicCount] = useState()
    const [StandardCount, setStandard] = useState()
    const [premiumCount, setPremiumCount] = useState()

    useEffect(() => {

        const fetchRevenueStatistics = async () => {
            try {
                const responce = await fetch(`http://localhost:5000/adminData/moviesDetails`);
                const data = await responce.json();
                const basePrice = data.revenueBasic
                const baseStandard = data.revenueStandard;
                const basePremium = data.revenuePremium;
                const rowsWithId = data.revenueMovies.map((row, index) => ({ ...row, id: index + 1 }));

                const reveBasic = rowsWithId.find(row => row.name === 'Basic');
                const reveStandard = rowsWithId.find(row => row.name === "Standard");
                const revePremium = rowsWithId.find(row => row.name === "Premium");
                if (reveBasic) {
                    const totalBasicPrices = reveBasic.price;
                    const totalBasicPrice = totalBasicPrices * basePrice
                    setBasicCount(totalBasicPrice);
                }
                if (reveStandard) {
                    const totalStandardPrices = reveStandard.price;
                    const totalStandardPrice = totalStandardPrices * baseStandard;
                    setStandard(totalStandardPrice)
                }
                if (revePremium) {
                    const totalPremiumPrices = revePremium.price;
                    const totalPremiumPrice = totalPremiumPrices * basePremium;
                    setPremiumCount(totalPremiumPrice)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchRevenueStatistics();
    }, []);

    const mockRevenueData = [
        { month: 'January', revenueBasic: basicCount, revenuePremium: premiumCount, revenueStandard: StandardCount },
        { month: 'February', revenueBasic: basicCount, revenuePremium: premiumCount, revenueStandard: StandardCount },
        { month: 'March', revenueBasic: basicCount, revenuePremium: premiumCount, revenueStandard: StandardCount },
        { month: 'April', revenueBasic: 1800, revenuePremium: 4000, revenueStandard: 5000 },
        { month: 'May', revenueBasic: 2000, revenuePremium: 5000, revenueStandard: 5000 },
        { month: 'June', revenueBasic: 100, revenuePremium: 2800, revenueStandard: 200 },
        { month: 'July', revenueBasic: 1000, revenuePremium: 2200, revenueStandard: 500 },
        { month: 'Augest', revenueBasic: 800, revenuePremium: 2000, revenueStandard: 5000 },
        { month: 'September', revenueBasic: 100, revenuePremium: 2000, revenueStandard: 5000 },
        { month: 'Octuber', revenueBasic: 100, revenuePremium: 2000, revenueStandard: 5000 },
        { month: 'November', revenueBasic: 900, revenuePremium: 2000, revenueStandard: 5000 },
        { month: 'December', revenueBasic: 800, revenuePremium: 2000, revenueStandard: 5000 },
    ];


    // Prepare data for chart
    const chartData = {
        labels: mockRevenueData.map(data => data.month),
        datasets: [
            {
                label: 'Basic',
                data: mockRevenueData.map(data => data.revenueBasic),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
            {
                label: 'Standard',
                data: mockRevenueData.map(data => data.revenueStandard),
                borderColor: 'rgba(255,128,237,1)',
                backgroundColor: 'rgba(75,192,19,0.2)',
            },
            {
                label: 'Premium',
                data: mockRevenueData.map(data => data.revenuePremium),
                borderColor: 'rgba(75,192,19,1)',
                backgroundColor: 'rgba(75,192,19,0.2)',
            },

        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            {mockRevenueData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
            ) : (
                <LodersBody />
            )}
        </div>
    );
};

export default RevenueStatistics;

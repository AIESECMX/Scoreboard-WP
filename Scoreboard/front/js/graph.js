function spinner () {
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(300).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(300).css({'overflow':'visible'});
}

function spinner_up () {
	$('#status').fadeIn(); // will first fade out the loading animation
	$('#preloader').delay(300).fadeIn('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(300).css({'overflow':'hidden'});
}

function rank (ranking) {
    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Ranking Global de # RE<br>' + 'Fechas: ' + start_date + ' - ' + end_date
        },
        subtitle: {
            text: 'Click en las barras para obtener más información.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.0f}</b> of total<br/>'
        },

        series: [{
            name: 'Rank',
            colorByPoint: true,
            data: [{
                name: '1. ' + ranking[0].name,
                y: ranking[0].apps,
                drilldown: ranking[0].name
            }, {
                name: '2. ' + ranking[1].name,
                y: ranking[1].apps,
                drilldown: ranking[1].name
            }, {
                name: '3. ' + ranking[2].name,
                y: ranking[2].apps,
                drilldown: ranking[2].name
            },{
                name: '4. ' + ranking[3].name,
                y: ranking[3].apps,
                drilldown: ranking[3].name
            },{
                name: '5. ' + ranking[4].name,
                y: ranking[4].apps,
                drilldown: ranking[4].name
            },{
                name: '6. ' + ranking[5].name,
                y: ranking[5].apps,
                drilldown: ranking[5].name
            },{
                name: '7. ' + ranking[6].name,
                y: ranking[6].apps,
                drilldown: ranking[6].name
            },{
                name: '8. ' + ranking[7].name,
                y: ranking[7].apps,
                drilldown: ranking[7].name
            },{
                name: '9. ' + ranking[8].name,
                y: ranking[8].apps,
                drilldown: ranking[8].name
            },{
                name: '10. ' + ranking[9].name,
                y: ranking[9].apps,
                drilldown: ranking[9].name
            },{
                name: '11. ' + ranking[10].name,
                y: ranking[10].apps,
                drilldown: ranking[10].name
            },{
                name: '12. ' + ranking[11].name,
                y: ranking[11].apps,
                drilldown: ranking[11].name
            },{
                name: '13. ' + ranking[12].name,
                y: ranking[12].apps,
                drilldown: ranking[12].name
            },{
                name: '14. ' + ranking[13].name,
                y: ranking[13].apps,
                drilldown: ranking[13].name
            },{
                name: '15. ' + ranking[14].name,
                y: ranking[14].apps,
                drilldown: ranking[14].name
            },{
                name: '16. ' + ranking[15].name,
                y: ranking[15].apps,
                drilldown: ranking[15].name
            },{
                name: '17. ' + ranking[16].name,
                y: ranking[16].apps,
                drilldown: ranking[16].name
            },{
                name: '18. ' + ranking[17].name,
                y: ranking[17].apps,
                drilldown: ranking[17].name
            },{
                name: '19. ' + ranking[18].name,
                y: ranking[18].apps,
                drilldown: ranking[18].name
            },{
                name: '20. ' + ranking[19].name,
                y: ranking[19].apps,
                drilldown: ranking[19].name
            }]
        }],
        drilldown: {
            series: [
            {
                name: ranking[0].name,
                id: ranking[0].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[0].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[0].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[0].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[0].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[0].appro
                    ],
                    [
                    	'Realized',
                    	ranking[0].apps
                    ],
                    [
                        'Completed',
                        ranking[0].comp
                    ]
                ]
            },
            {
                name: ranking[1].name,
                id: ranking[1].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[1].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[1].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[1].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[1].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[1].appro
                    ],
                    [
                    	'Realized',
                    	ranking[1].apps
                    ],
                    [
                        'Completed',
                        ranking[1].comp
                    ]
                ]
            },
            {
                name: ranking[2].name,
                id: ranking[2].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[2].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[2].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[2].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[2].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[2].appro
                    ],
                    [
                    	'Realized',
                    	ranking[2].apps
                    ],
                    [
                        'Completed',
                        ranking[2].comp
                    ]
                ]
            },
            {
                name: ranking[3].name,
                id: ranking[3].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[3].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[3].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[3].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[3].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[3].appro
                    ],
                    [
                    	'Realized',
                    	ranking[3].apps
                    ],
                    [
                        'Completed',
                        ranking[3].comp
                    ]
                ]
            },
            {
                name: ranking[4].name,
                id: ranking[4].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[4].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[4].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[4].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[4].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[4].appro
                    ],
                    [
                    	'Realized',
                    	ranking[4].apps
                    ],
                    [
                        'Completed',
                        ranking[4].comp
                    ]
                ]
            },
            {
                name: ranking[5].name,
                id: ranking[5].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[5].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[5].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[5].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[5].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[5].appro
                    ],
                    [
                    	'Realized',
                    	ranking[5].apps
                    ],
                    [
                        'Completed',
                        ranking[5].comp
                    ]
                ]
            },{
                name: ranking[6].name,
                id: ranking[6].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[6].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[6].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[6].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[6].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[6].appro
                    ],
                    [
                    	'Realized',
                    	ranking[6].apps
                    ],
                    [
                        'Completed',
                        ranking[6].comp
                    ]
                ]
            },{
                name: ranking[7].name,
                id: ranking[7].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[7].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[7].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[7].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[7].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[7].appro
                    ],
                    [
                    	'Realized',
                    	ranking[7].apps
                    ],
                    [
                        'Completed',
                        ranking[7].comp
                    ]
                ]
            },{
                name: ranking[8].name,
                id: ranking[8].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[8].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[8].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[8].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[8].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[8].appro
                    ],
                    [
                    	'Realized',
                    	ranking[8].apps
                    ],
                    [
                        'Completed',
                        ranking[8].comp
                    ]
                ]
            },{
                name: ranking[9].name,
                id: ranking[9].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[9].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[9].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[9].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[9].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[9].appro
                    ],
                    [
                    	'Realized',
                    	ranking[9].apps
                    ],
                    [
                        'Completed',
                        ranking[9].comp
                    ]
                ]
            },{
                name: ranking[10].name,
                id: ranking[10].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[10].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[10].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[10].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[10].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[10].appro
                    ],
                    [
                    	'Realized',
                    	ranking[10].apps
                    ],
                    [
                        'Completed',
                        ranking[10].comp
                    ]
                ]
            },{
                name: ranking[11].name,
                id: ranking[11].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[11].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[11].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[11].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[11].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[11].appro
                    ],
                    [
                    	'Realized',
                    	ranking[11].apps
                    ],
                    [
                        'Completed',
                        ranking[11].comp
                    ]
                ]
            },{
                name: ranking[12].name,
                id: ranking[12].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[12].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[12].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[12].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[12].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[12].appro
                    ],
                    [
                    	'Realized',
                    	ranking[12].apps
                    ],
                    [
                        'Completed',
                        ranking[12].comp
                    ]
                ]
            },{
                name: ranking[13].name,
                id: ranking[13].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[13].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[13].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[13].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[13].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[13].appro
                    ],
                    [
                    	'Realized',
                    	ranking[13].apps
                    ],
                    [
                        'Completed',
                        ranking[13].comp
                    ]
                ]
            },{
                name: ranking[14].name,
                id: ranking[14].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[14].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[14].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[14].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[14].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[14].appro
                    ],
                    [
                    	'Realized',
                    	ranking[14].apps
                    ],
                    [
                        'Completed',
                        ranking[14].comp
                    ]
                ]
            },{
                name: ranking[15].name,
                id: ranking[15].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[15].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[15].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[15].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[15].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[15].appro
                    ],
                    [
                    	'Realized',
                    	ranking[15].apps
                    ],
                    [
                        'Completed',
                        ranking[15].comp
                    ]
                ]
            },{
                name: ranking[16].name,
                id: ranking[16].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[16].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[16].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[16].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[16].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[16].appro
                    ],
                    [
                    	'Realized',
                    	ranking[16].apps
                    ],
                    [
                        'Completed',
                        ranking[16].comp
                    ]
                ]
            },{
                name: ranking[17].name,
                id: ranking[17].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[17].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[17].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[17].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[17].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[17].appro
                    ],
                    [
                    	'Realized',
                    	ranking[17].apps
                    ],
                    [
                        'Completed',
                        ranking[17].comp
                    ]
                ]
            },{
                name: ranking[18].name,
                id: ranking[18].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[18].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[18].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[18].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[18].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[18].appro
                    ],
                    [
                    	'Realized',
                    	ranking[18].apps
                    ],
                    [
                        'Completed',
                        ranking[18].comp
                    ]
                ]
            },{
                name: ranking[19].name,
                id: ranking[19].name,
                data: [
                    [
                        'app/Applicants',
                        ranking[19].app_app
                    ],
                    [
                        'app/Applications',
                        ranking[19].app_apps
                    ],
                    [
                        'MA/Applicants',
                        ranking[19].ma_app
                    ],
                    [
                        'MA/Applications',
                        ranking[19].ma_apps
                    ],
                    [
                        'Approved',
                        ranking[19].appro
                    ],
                    [
                    	'Realized',
                    	ranking[19].apps
                    ],
                    [
                        'Completed',
                        ranking[19].comp
                    ]
                ]
            },
            ]
        }
    });
}
import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import downloadReport from "../../../../public/downloadReport.svg";
const countryMapping:any = {
  'Afghanistan': 'Afghanistan',
  'Albania': 'Albania',
  'Algeria': 'Algeria',
  'Andorra': 'Andorra',
  'Angola': 'Angola',
  'Antigua and Barbuda': 'Antigua and Barbuda',
  'Argentina': 'Argentina',
  'Armenia': 'Armenia',
  'Australia': 'Australia',
  'Austria': 'Austria',
  'Azerbaijan': 'Azerbaijan',
  'Bahamas': 'Bahamas',
  'Bahrain': 'Bahrain',
  'Bangladesh': 'Bangladesh',
  'Barbados': 'Barbados',
  'Belarus': 'Belarus',
  'Belgium': 'Belgium',
  'Belize': 'Belize',
  'Benin': 'Benin',
  'Bhutan': 'Bhutan',
  'Bolivia': 'Bolivia',
  'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
  'Botswana': 'Botswana',
  'Brazil': 'Brazil',
  'Brunei Darussalam': 'Brunei Darussalam',
  'Bulgaria': 'Bulgaria',
  'Burkina Faso': 'Burkina Faso',
  'Burundi': 'Burundi',
  'Cabo Verde': 'Cabo Verde',
  'Cambodia': 'Cambodia',
  'Cameroon': 'Cameroon',
  'Canada': 'Canada',
  'Central African Republic': 'Central African Republic',
  'Chad': 'Chad',
  'Chile': 'Chile',
  'China': 'China',
  'Colombia': 'Colombia',
  'Comoros': 'Comoros',
  'Congo (Congo-Brazzaville)': 'Congo (Congo-Brazzaville)',
  'Congo (Democratic Republic of the Congo)': 'Congo (Democratic Republic of the Congo)',
  'Costa Rica': 'Costa Rica',
  'Croatia': 'Croatia',
  'Cuba': 'Cuba',
  'Cyprus': 'Cyprus',
  'Czech Republic (Czechia)': 'Czech Republic (Czechia)',
  'Denmark': 'Denmark',
  'Djibouti': 'Djibouti',
  'Dominica': 'Dominica',
  'Dominican Republic': 'Dominican Republic',
  'Ecuador': 'Ecuador',
  'Egypt': 'Egypt',
  'El Salvador': 'El Salvador',
  'Equatorial Guinea': 'Equatorial Guinea',
  'Eritrea': 'Eritrea',
  'Estonia': 'Estonia',
  'Eswatini': 'Eswatini',
  'Ethiopia': 'Ethiopia',
  'Fiji': 'Fiji',
  'Finland': 'Finland',
  'France': 'France',
  'Gabon': 'Gabon',
  'Gambia': 'Gambia',
  'Georgia': 'Georgia',
  'Germany': 'Germany',
  'Ghana': 'Ghana',
  'Greece': 'Greece',
  'Grenada': 'Grenada',
  'Guatemala': 'Guatemala',
  'Guinea': 'Guinea',
  'Guinea-Bissau': 'Guinea-Bissau',
  'Guyana': 'Guyana',
  'Haiti': 'Haiti',
  'Honduras': 'Honduras',
  'Hungary': 'Hungary',
  'Iceland': 'Iceland',
  'India': 'India',
  'Indonesia': 'Indonesia',
  'Iran': 'Iran',
  'Iraq': 'Iraq',
  'Ireland': 'Ireland',
  'Israel': 'Israel',
  'Italy': 'Italy',
  'Jamaica': 'Jamaica',
  'Japan': 'Japan',
  'Jordan': 'Jordan',
  'Kazakhstan': 'Kazakhstan',
  'Kenya': 'Kenya',
  'Kiribati': 'Kiribati',
  'Korea, North': 'Korea, North',
  'Korea, South': 'Korea, South',
  'Kuwait': 'Kuwait',
  'Kyrgyzstan': 'Kyrgyzstan',
  'Laos': 'Laos',
  'Latvia': 'Latvia',
  'Lebanon': 'Lebanon',
  'Lesotho': 'Lesotho',
  'Liberia': 'Liberia',
  'Libya': 'Libya',
  'Liechtenstein': 'Liechtenstein',
  'Lithuania': 'Lithuania',
  'Luxembourg': 'Luxembourg',
  'Madagascar': 'Madagascar',
  'Malawi': 'Malawi',
  'Malaysia': 'Malaysia',
  'Maldives': 'Maldives',
  'Mali': 'Mali',
  'Malta': 'Malta',
  'Marshall Islands': 'Marshall Islands',
  'Mauritania': 'Mauritania',
  'Mauritius': 'Mauritius',
  'Mexico': 'Mexico',
  'Micronesia': 'Micronesia',
  'Moldova': 'Moldova',
  'Monaco': 'Monaco',
  'Mongolia': 'Mongolia',
  'Montenegro': 'Montenegro',
  'Morocco': 'Morocco',
  'Mozambique': 'Mozambique',
  'Myanmar (Burma)': 'Myanmar (Burma)',
  'Namibia': 'Namibia',
  'Nauru': 'Nauru',
  'Nepal': 'Nepal',
  'Netherlands': 'Netherlands',
  'New Zealand': 'New Zealand',
  'Nicaragua': 'Nicaragua',
  'Niger': 'Niger',
  'Nigeria': 'Nigeria',
  'North Macedonia': 'North Macedonia',
  'Norway': 'Norway',
  'Oman': 'Oman',
  'Pakistan': 'Pakistan',
  'Palau': 'Palau',
  'Panama': 'Panama',
  'Papua New Guinea': 'Papua New Guinea',
  'Paraguay': 'Paraguay',
  'Peru': 'Peru',
  'Philippines': 'Philippines',
  'Poland': 'Poland',
  'Portugal': 'Portugal',
  'Qatar': 'Qatar',
  'Romania': 'Romania',
  'Russia': 'Russia',
  'Rwanda': 'Rwanda',
  'Saint Kitts and Nevis': 'Saint Kitts and Nevis',
  'Saint Lucia': 'Saint Lucia',
  'Saint Vincent and the Grenadines': 'Saint Vincent and the Grenadines',
  'Samoa': 'Samoa',
  'San Marino': 'San Marino',
  'Sao Tome and Principe': 'Sao Tome and Principe',
  'Saudi Arabia': 'Saudi Arabia',
  'Senegal': 'Senegal',
  'Serbia': 'Serbia',
  'Seychelles': 'Seychelles',
  'Sierra Leone': 'Sierra Leone',
  'Singapore': 'Singapore',
  'Slovakia': 'Slovakia',
  'Slovenia': 'Slovenia',
  'Solomon Islands': 'Solomon Islands',
  'Somalia': 'Somalia',
  'South Africa': 'South Africa',
  'South Sudan': 'South Sudan',
  'Spain': 'Spain',
  'Sri Lanka': 'Sri Lanka',
  'Sudan': 'Sudan',
  'Suriname': 'Suriname',
  'Sweden': 'Sweden',
  'Switzerland': 'Switzerland',
  'Syria': 'Syria',
  'Taiwan': 'Taiwan',
  'Tajikistan': 'Tajikistan',
  'Tanzania': 'Tanzania',
  'Thailand': 'Thailand',
  'Timor-Leste': 'Timor-Leste',
  'Togo': 'Togo',
  'Tonga': 'Tonga',
  'Trinidad and Tobago': 'Trinidad and Tobago',
  'Tunisia': 'Tunisia',
  'Turkey': 'Turkey',
  'Turkmenistan': 'Turkmenistan',
  'Tuvalu': 'Tuvalu',
  'Uganda': 'Uganda',
  'Ukraine': 'Ukraine',
  'United Arab Emirates': 'United Arab Emirates',
  'United Kingdom': 'United Kingdom',
  'United States': 'United States',
  'Uruguay': 'Uruguay',
  'Uzbekistan': 'Uzbekistan',
  'Vanuatu': 'Vanuatu',
  'Vatican City': 'Vatican City',
  'Venezuela': 'Venezuela',
  'Vietnam': 'Vietnam',
  'Yemen': 'Yemen',
  'Zambia': 'Zambia',
  'Zimbabwe': 'Zimbabwe'
};


const DemoGraphicReport = () => {
  const [hover, setHover] = React.useState(false);
  const { googleAnalytics, isLoading, error } = useGoogleAnalytics();
  const chartRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading && googleAnalytics?.countryData) {
      const loadGoogleCharts = () => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.onload = () => {
          window.google.charts.load('current', {
            packages: ['geochart'],
          });
          window.google.charts.setOnLoadCallback(drawRegionsMap);
        };
        document.head.appendChild(script);
      };

      const drawRegionsMap = () => {
        const data:any = new window.google.visualization.DataTable();
        data.addColumn('string', 'Country');
        data.addColumn('number', 'Total Users');

     
        // @ts-ignore
        const rows = Object.entries(googleAnalytics.countryData).filter(([country]) => country !== '(not set)').map(([country, data]) => [countryMapping[country] || country, data.totalUsers]);

        data.addRows(rows);

        const options = {
          colorAxis: { colors: ['#ffa4a4', '#fc7777'] },
          backgroundColor: '#ede8fa',
          defaultColor: '#7669b5',
          legend: 'none',
          datalessRegionColor: '#7669b5',
          enableRegionInteractivity: true,
          tooltip: {
            isHtml: true, // To enable HTML tooltips for better customization
            trigger: 'focus', // Tooltips show on focus for better UX
            textStyle: {
              fontSize: 14, // Making tooltip text larger for readability
              color: '#333', // Dark color for text visibility
            }
          },
          region: 'world', // Ensuring it's a world map or specify a region
          displayMode: 'regions', 
          sizeAxis: { minValue: 0, maxValue: 500 },
        };

        const chart = new window.google.visualization.GeoChart(chartRef.current);
        chart.draw(data, options);
      };

      loadGoogleCharts();
    }
  }, [googleAnalytics, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading demographic data</div>;
  }

  return (
    <div className="  relative  hover:cursor-pointer px-3 custom-xl:px-6 py-3 custom-xl:py-8  bg-[#ede8fa]  rounded-md sm:rounded-xl  custom-lg:rounded-3xl ">
      <div className="flex items-start justify-between gap-2  pt-1.5 ">
        <div className="  text-[#7669b5] font-medium pl-7">
          <h1 className="text-5xl">Demographic Report </h1>
        </div>

        <div className="w-fit">
          <Image  loading="lazy" 
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            src={downloadReport}
            alt=""
            className="w-7  hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-5 right-4 bg-[#7669b5] px-3.5 py-1.5 text-xl rounded-xl text-white transition-all duration-700 transform origin-bottom-right ${
              hover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Download Report
          </div>
        </div>
      </div>
            <div className='overflow-x-auto w-full mt-8'>

      <div ref={chartRef} className="w-full h-[600px] " />
            </div>
    </div>
  );
};

export default DemoGraphicReport;
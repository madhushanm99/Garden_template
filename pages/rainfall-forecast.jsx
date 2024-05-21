import PageBanner from "@/src/components/PageBanner";
import Partners from "@/src/components/Partners";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import districts from '@/src/components/districts.json';
import cities from '@/src/components/cities.json';

import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const initialChartOptions = {
  series: [
    {
      name: "Rainfall",
      data: [],
    },
    
  ],
  options: {
    chart: {
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: "rgba(0,0,0,0.1)",
    },

    stroke: {
      curve: "smooth",
      width: 1,
    },
    xaxis: {
      categories: [],
    },
  },
};

const ServiceDetails = () => {
  const handleItemClick = (item) => {
    //alert(item.value);
  };
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  const [chartData, setChartData] = useState(initialChartOptions);

  const handleDistrictClick = (item) => {
    setSelectedDistrict(item.value);
    setSelectedCity(null);
  };
  const handleCityClick = async (item) => {
    setSelectedCity(item);
    const ascCode = item.ascCode;

    try {
      const response = await fetch(`http://localhost:8000/getWeatherData.php?ascCode=${ascCode}`);
      const data = await response.json();

      if (data.success) {
        const rainfall = [
          data.weatherData.Day01,
          data.weatherData.Day02,
          data.weatherData.Day03,
          data.weatherData.Day04,
          data.weatherData.Day05,
          data.weatherData.Day06,
          data.weatherData.Day07,
          data.weatherData.Day08,
          data.weatherData.Day09,
          data.weatherData.Day10,
        ];
        console.log(data.weatherData.LastUpdate);
        const lastUpdated = new Date(data.weatherData.LastUpdate);
        const xaxisCategories = Array.from({ length: 10 }, (_, i) => {
          const date = new Date(lastUpdated);
          date.setDate(date.getDate() + i);
          return `${date.getMonth() + 1}-${date.getDate()}`; // Format as YYYY-MM-DD
        });

        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [
            {
              name: "Rainfall",
              data: rainfall,
            },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              ...prevChartData.options.xaxis,
              categories: xaxisCategories,
            },
          },
        }));

        
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      
    }
  };
  

  const onSelectionChange = (key) => {
    setSelectedDistrict(null);
  };

  return (
    <Layout>
      <PageBanner pageName={"Rainfall_Forecast"} />
      {/*====== Start Service Details section ======*/}
      <section className="service-details-section pt-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center mb-50 wow fadeInDown">
                {/* <span className="sub-title">
                  <i className="flaticon-cloud-showers" />
                  Pricing Plan
                </span> */}
                <h2>Find Rainfall ForeCast</h2>
              </div>
              <div className="section-title text-center mb-50 wow fadeInDown">

                <Autocomplete
                  label="Select District"
                  placeholder="Search the District"
                  className="max-w-xs mb-2 "
                  defaultItems={districts}
                  onSelectionChange={onSelectionChange}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} onClick={() => handleDistrictClick(item)} onSelectionChange={() => restCityClick}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                {selectedDistrict && (
                  <Autocomplete
                    label="Select City"
                    placeholder="Search the City"
                    className="max-w-xs mb-2 ml-2"
                    defaultItems={cities[selectedDistrict]}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} onClick={() => handleCityClick(item)}  >
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
                {selectedCity && (
                  <div>
                    <Chart
                      type="area"
                      width="100%"
                      height="390"
                      options={chartData.options}
                      series={chartData .series}
                    />
                  </div>
                )}
              </div>


            </div>
          </div>
          
        </div>
      </section>
      {/*====== End Service Details section ======*/}
      
    </Layout>
  );
};
export default ServiceDetails;

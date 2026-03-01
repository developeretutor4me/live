
import axios from 'axios';
import { google } from 'googleapis';
import path from 'path';

export async function GET() {
  try {
 
    const serviceAccountResponse = await axios.get(process.env.GOOGLE_SERVICE_ACCOUNT_FILE!);
    const serviceAccountKey = serviceAccountResponse.data;

    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccountKey,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsdata = google.analyticsdata('v1beta');
    const authClient = await auth.getClient();
    // @ts-ignore
    google.options({ auth: authClient });

    // Basic report request
    const mainRequest = {
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'country' },
        { name: 'date' }
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'totalUsers' },
        { name: 'sessions' },
        { name: 'averageSessionDuration' },
        { name: 'screenPageViews' }
      ]
    };

    // Realtime report request for current active users
    const realtimeRequest = {
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dimensions: [
        { name: 'country' }
      ],
      metrics: [
        { name: 'activeUsers' }
      ]
    };

    try {
      // Fetch main report
      const response = await analyticsdata.properties.runReport({
        property: mainRequest.property,
        requestBody: mainRequest
      });

      // Fetch realtime data
      const realtimeResponse = await analyticsdata.properties.runRealtimeReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        requestBody: realtimeRequest
      });

      // Initialize formatted data structure
      const formattedData:any = {
        currentActiveUsers: 0,
        totalStats: {
          activeUsers: 0,
          totalUsers: 0,
          sessions: 0,
          averageSessionDuration: 0,
          pageViews: 0
        },
        countryData: {},
        dailyData: [],
        realtime: {
          activeUsers: 0,
          byCountry: []
        }
      };

      // Process main report data
      if (response.data.rows && response.data.rows.length > 0) {
        // Process each row
        response.data.rows.forEach((row:any) => {
          const country = row.dimensionValues[0].value;
          const date = row.dimensionValues[1].value;
          const metrics = {
            activeUsers: parseInt(row.metricValues[0].value) || 0,
            totalUsers: parseInt(row.metricValues[1].value) || 0,
            sessions: parseInt(row.metricValues[2].value) || 0,
            averageSessionDuration: parseFloat(row.metricValues[3].value) || 0,
            pageViews: parseInt(row.metricValues[4].value) || 0
          };

          // Aggregate total stats
          formattedData.totalStats.activeUsers += metrics.activeUsers;
          formattedData.totalStats.totalUsers += metrics.totalUsers;
          formattedData.totalStats.sessions += metrics.sessions;
          formattedData.totalStats.pageViews += metrics.pageViews;

          // Group by country
          if (!formattedData.countryData[country]) {
            formattedData.countryData[country] = {
              activeUsers: 0,
              totalUsers: 0,
              sessions: 0,
              pageViews: 0
            };
          }
          formattedData.countryData[country].activeUsers += metrics.activeUsers;
          formattedData.countryData[country].totalUsers += metrics.totalUsers;
          formattedData.countryData[country].sessions += metrics.sessions;
          formattedData.countryData[country].pageViews += metrics.pageViews;

          // Add to daily data
          formattedData.dailyData.push({
            date,
            ...metrics
          });
        });

        // Calculate average session duration
        if (formattedData.totalStats.sessions > 0) {
          formattedData.totalStats.averageSessionDuration = 
            response.data.rows.reduce((acc, row:any) => 
              acc + (parseFloat(row.metricValues[3].value) || 0), 0) / response.data.rows.length;
        }
      }

      // Process realtime data
      if (realtimeResponse.data.rows && realtimeResponse.data.rows.length > 0) {
        formattedData.realtime.activeUsers = realtimeResponse.data.rows.reduce(
          (total, row:any) => total + (parseInt(row.metricValues[0].value) || 0), 
          0
        );

        formattedData.realtime.byCountry = realtimeResponse.data.rows.map((row:any) => ({
          country: row.dimensionValues[0].value,
          activeUsers: parseInt(row.metricValues[0].value) || 0
        }));
      }

      return new Response(JSON.stringify(formattedData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      console.error('Analytics Data Error:', error);
      return new Response(JSON.stringify({
        error: error instanceof Error ? error.message : 'Failed to fetch analytics data',
        details: error
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error) {
    console.error('Authentication Error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to authenticate with Google Analytics',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
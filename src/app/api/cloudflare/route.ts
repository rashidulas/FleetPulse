interface ApiResponse {
    success: boolean;
    result?: {
      response: string;
    };
    errors?: any; // Adjust type according to the structure of errors, if needed
  }
  
  // POST handler
  export async function POST(req: Request) {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const model = "@cf/meta/llama-3.1-8b-instruct"; // You can change this model if needed
  
    // Extract driver data from request body
    const {
      name, // Make sure to include name in your request body
      safetyScore,
      ecoScore,
      needsImprovement = [], // Default to empty array if undefined
      experience,
      totalTrips,
      alertsToday,
      improvedMetrics = [] // Default to empty array if undefined
    } = await req.json();
  
    // Construct a custom prompt using driver metrics
    const prompt = ` Keep it short and concise. (Don't need to show known metrics)
      Generate a feedback report for the driver based on the following metrics:
      - Name: ${name}
      - Experience: ${experience} years
      - Safety Score: ${safetyScore}
      - Eco Score: ${ecoScore}
      - Total Trips: ${totalTrips}
      - Alerts Today: ${alertsToday}
      - Improved Metrics: ${improvedMetrics.join(", ")}
      - Needs Improvement: ${needsImprovement.join(", ")}
  
      Provide actionable recommendations for improving performance.
    `;
  
    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
  
      const data: ApiResponse = await response.json();
      if (data.success) {
        return new Response(JSON.stringify({ suggestions: data.result?.response }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: "Failed to get suggestions", details: data.errors }), { status: 500 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" }), { status: 500 });
    }
  }
  
  // Optional: GET handler to inform users about the correct usage
  export async function GET(req: Request) {
    return new Response(JSON.stringify({ message: "This endpoint only supports POST requests." }), { status: 405 });
  }
  
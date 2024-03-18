import Head from "next/head";
import Layout from "../components/Layout";
import BMICalculator from "../calculators/BMICalculator";
import AdSenseWidget from "../components/AdSenseWidget";

export default function BMICalculatorPage() {
    return (
        <Layout>
            <Head>
                <title>BMI Calculator | SportCalculators</title>
                <meta
                    name="description"
                    content="Quickly find out your Body Mass Index (BMI) with our easy-to-use online BMI Calculator. Input your height and weight to see if you're underweight, normal, overweight, or obese. Our tool supports both metric and imperial units and provides ideal weight ranges for each BMI category. Discover your BMI now and gain insights into your health status."
                />
            </Head>

            <h2 className="calculator">BMI Calculator</h2>
            <p>
            Quickly find out your Body Mass Index (BMI) with our easy-to-use online BMI Calculator. Input your height and weight to see if you're underweight, normal, overweight, or obese. Our tool supports both metric and imperial units and provides ideal weight ranges for each BMI category. Discover your BMI now and gain insights into your health status.
            </p>

            <AdSenseWidget />
            <div style={{ paddingTop: "40px", paddingBottom: "40px", display: "flex", justifyContent: "center" }}>
                <BMICalculator></BMICalculator>
            </div>
            <AdSenseWidget />

            <h3>How to Use Our BMI Calculator</h3>
            <p>Our BMI Calculator simplifies the process of calculating your BMI. Here's how to use it:</p>

            <ol>
            <li>Select Your Measurement Unit: Choose between metric (kg, cm) or imperial (lbs, inches) units based on your preference.</li>
            <li>Enter Your Weight: Input your weight in the selected unit.</li>
            <li>Enter Your Height: Provide your height in the selected unit.</li>
            <li>The calculator will display your BMI and indicate the category it falls into, such as underweight, normal weight, overweight, or obesity.</li>
            </ol>


            <h3>Understanding Your Body Mass Index</h3>
            <p>Body Mass Index (BMI) is a widely used measure to classify underweight, normal weight, overweight, and obesity by comparing your weight to your height. It provides a simple numeric measure that allows health professionals and individuals to discuss weight problems more objectively. However, calculating and interpreting BMI can sometimes be tedious and confusing. That's why we've introduced our easy-to-use BMI Calculator to help you quickly determine your BMI and understand what it means for your health.</p>

            <h3>What is BMI and Why Does It Matter?</h3>
            <p>BMI is calculated by dividing your weight in kilograms by the square of your height in meters. This simple formula has been used for over a century to assess whether a person has a healthy body weight for a given height. It's a useful tool for identifying possible weight problems and the associated health risks.</p>


            <h3>Interpreting Your BMI</h3>
            <ul>
                <li>Underweight (BMI &lt; 18.5): May indicate malnutrition, an eating disorder, or other health problems. Consult a healthcare provider for advice.</li>
                <li>Normal Weight (BMI 18.5 – 24.9): Generally indicates a healthy weight.</li>
                <li>Overweight (BMI 25 – 29.9): May lead to health issues such as cardiovascular disease, diabetes, and others. Consider lifestyle changes or consult a healthcare provider.</li>
                <li>Obesity (BMI ≥ 30): Significantly increases the risk of various health conditions. Seeking medical advice is strongly recommended.</li>
            </ul>
            <h3>Limitations of BMI</h3>
            <p>While BMI is a useful screening tool, it's not a direct measure of body fat or health. It doesn't distinguish between excess fat, muscle, or bone mass, nor does it account for the distribution of fat throughout the body. Always consider BMI as one of many factors in assessing your overall health and consult with healthcare professionals for a comprehensive evaluation.</p>

            <h3>Take the First Step Towards a Healthier You</h3>
            <p>Our BMI Calculator is designed to help you take that first step in understanding more about your body and the potential health risks associated with your body weight. Remember, taking action, whether it's aiming for a healthier diet, incorporating physical activity into your daily routine, or seeking professional advice, can lead to a healthier and more fulfilling life.</p>

            <p>Check your BMI today and start your journey towards a healthier tomorrow!</p>

        </Layout>
    );
}

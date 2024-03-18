import React, { Component } from 'react';
import styled from "@emotion/styled";
import { TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, Grid, Table, TableRow, TableCell, TableBody } from '@mui/material';
import { size } from 'lodash';

const Subheader = styled.div`
  text-align: left;
  margin-left: -20px;
  margin-right: -20px;
  background: #f5f5f5;
  padding-left: 20px;
`;

const CalculatorBox = styled(Paper)`
  padding: 20px;
  text-align: center;
  max-width: 600px;
  margin: auto; // Centers the calculator box on the page
`;

const StyledTableCell = styled(TableCell)`
  text-align: center;
  font-weight: inherit;
`;

class BMICalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            height: '',
            unit: 'metric',
            bmi: '',
            bmiCategory: '',
            weightRanges: {},
        };
    }

    calculateBMI = () => {
        const { weight, height, unit } = this.state;
        let newHeight = unit === 'metric' ? height / 100 : height * 0.0254; // Convert height to meters
        let newWeight = unit === 'metric' ? weight : weight * 0.453592; // Convert weight to kilograms
        let bmiValue = (newWeight / (newHeight ** 2)).toFixed(2);

        this.setState({ bmi: bmiValue });
        this.categorizeBMI(bmiValue);
        this.calculateWeightRanges(newHeight, unit);
    };

    calculateWeightRanges = (heightInMeters, unit) => {
        const categories = {
            'Underweight': { minBmi: 0, maxBmi: 18.5, min: 0, max: 18.5 },
            'Normal weight': { minBmi: 18.5, maxBmi: 24.9, min: 18.5, max: 24.9 },
            'Overweight': { minBmi: 25, maxBmi: 29.9, min: 25, max: 29.9 },
            'Obesity': { minBmi: 30, maxBmi: Infinity, min: 30, max: Infinity },
        };

        let weightRanges = {};
        for (let category in categories) {
            let minWeight = categories[category].min * heightInMeters ** 2;
            let maxWeight = categories[category].max * heightInMeters ** 2;
            if (unit === 'imperial') {
                // Convert kg to lbs for display
                minWeight = minWeight * 2.20462;
                maxWeight = maxWeight === Infinity ? Infinity : maxWeight * 2.20462;
            }
            weightRanges[category] = {
                min: Math.round(minWeight),
                max: maxWeight === Infinity ? '+' : Math.round(maxWeight),
                minBmi: categories[category].minBmi,
                maxBmi: categories[category].maxBmi,
            };
        }
        this.setState({ weightRanges });
    };


    categorizeBMI = (bmiValue) => {
        let category = '';
        if (bmiValue < 18.5) category = 'Underweight';
        else if (bmiValue >= 18.5 && bmiValue <= 24.9) category = 'Normal weight';
        else if (bmiValue >= 25 && bmiValue <= 29.9) category = 'Overweight';
        else if (bmiValue >= 30) category = 'Obesity';
        this.setState({ bmiCategory: category });
    };

    handleUnitChange = (event) => {
        this.setState({ unit: event.target.value }, this.calculateBMI);
    };

    handleWeightChange = (event) => {
        this.setState({ weight: event.target.value }, this.calculateBMI);
    };

    handleHeightChange = (event) => {
        this.setState({ height: event.target.value }, this.calculateBMI);
    };

    render() {
        const { unit, weight, height, bmi, bmiCategory, weightRanges } = this.state;

        return (
            <CalculatorBox elevation={3}>
                <Grid container direction="row" justifyContent="center" alignItems="center">

                    <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                        <Subheader>
                            <Typography variant="overline">Unit of Measurement</Typography>
                        </Subheader>
                    </Grid>


                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="unit" name="unit" value={unit} onChange={this.handleUnitChange}>
                            <Grid item xs={12} >
                                <FormControlLabel value="metric" control={<Radio />} label="Metric (kg, cm)" />

                                <FormControlLabel value="imperial" control={<Radio />} label="Imperial (lbs, inches)" />
                            </Grid>
                        </RadioGroup>
                    </FormControl>


                    <Grid item xs={12} style={{ paddingBottom: "20px", paddingTop: "20px" }}>
                        <Subheader>
                            <Typography variant="overline">Your Details</Typography>
                        </Subheader>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={unit === 'metric' ? "Weight (kg)" : "Weight (lbs)"}
                            variant="standard"
                            type="number"
                            value={weight}
                            onChange={this.handleWeightChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={unit === 'metric' ? "Height (cm)" : "Height (inches)"}
                            variant="standard"
                            type="number"
                            value={height}
                            onChange={this.handleHeightChange}
                        />
                    </Grid>
                    {bmi && (
                        <>
                            <Grid item xs={12} style={{ paddingBottom: "20px", paddingTop: "20px" }}>
                                <Subheader>
                                    <Typography variant="overline">Your BMI Result</Typography>
                                </Subheader>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Your BMI:</Typography>
                                <Typography style={{ fontSize: "2em", fontWeight: "bold" }}>{bmi}</Typography>
                                <Typography>( {bmiCategory} )</Typography>


                                <Table style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", paddingTop: "20px" }}>
                                    <TableBody>

                                        <TableRow className='headerRow' style={{ borderBottom: '2px solid #e0e0e0', backgroundColor: "#f5f5f5" }}>
                                            <StyledTableCell>BMI</StyledTableCell>
                                            <StyledTableCell>Weight range</StyledTableCell>
                                            <StyledTableCell>Category</StyledTableCell>
                                        </TableRow>
                                        {Object.keys(weightRanges).map((category) => (
                                            <TableRow key={category} style={{ fontWeight: bmiCategory === category ? 'bold' : 'normal' }}>
                                                <StyledTableCell>{weightRanges[category].minBmi} - {weightRanges[category].maxBmi}</StyledTableCell>
                                                <StyledTableCell>{weightRanges[category].min}{category === 'Obesity' ? '' : ' - '}{weightRanges[category].max} {unit === 'metric' ? 'kg' : 'lbs'}</StyledTableCell>
                                                <StyledTableCell>{category}</StyledTableCell>
                                            </TableRow>
                                        ))}


                                    </TableBody>
                                </Table>


                            </Grid>


                        </>
                    )}
                </Grid>
            </CalculatorBox >
        );
    }
}

export default BMICalculator;

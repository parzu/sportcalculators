import React, { use, useState, useEffect } from "react";
import { Paper, TextField, Typography, InputAdornment, ToggleButton, ToggleButtonGroup, Grid, RadioGroup, Radio, FormControlLabel, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Bike } from "mdi-material-ui";

import BikeParameters from "../components/BikeParameters.js";
import { textAlign } from "@mui/system";

function CadenceCalculator() {
    const [bikeParameters, setBikeParameters] = useState({
        wheelDiameter: 0,
        chainringTeeth: 0,
        cogTeeth: 0,
    });
    const [speed, setSpeed] = useState(0);
    const [speedUnit, setSpeedUnit] = useState("km/h");
    const [cadence, setCadence] = useState(0);


    useEffect(() => {
        console.log("bike parameters changed");
        setSpeed(calculateSpeed(cadence, speedUnit));
    }, [bikeParameters]);

    function handleBikeParametersChange(parameters) {
        setBikeParameters(parameters);
    }

    function handleCadenceChange(event) {
        setCadence(event.target.value);
        setSpeed(calculateSpeed(event.target.value, speedUnit));
    }

    function handleSpeedChange(event) {
        setSpeed(event.target.value);
        setCadence(calculateCadence(event.target.value, speedUnit));
    }

    function handleSpeedUnitChange(event) {
        setSpeedUnit(event.target.value);
        setSpeed(calculateSpeed(cadence, event.target.value));
    }

    function calculateCadence(newSpeed, newSpeedUnit) {
        // Calculate the gear ratio
        const gearRatio = bikeParameters.chainringTeeth / bikeParameters.cogTeeth;
        // Calculate the wheel circumference
        const wheelCircumference = Math.PI * bikeParameters.wheelDiameter / 1000;
        // Calculate the cadence in RPM
        if (newSpeedUnit === "km/h") {
            const cadence = ((newSpeed / 3.6) * 60) / (gearRatio * wheelCircumference);
            return cadence.toFixed(2);
        }
        const cadence = ((newSpeed / 2.23694) * 60) / (gearRatio * wheelCircumference);
        return cadence.toFixed(2);
    }

    // Function for calculating the speed based on the bike parameters and cadende
    function calculateSpeed(newCadence, newSpeedUnit) {
        // Calculate the gear ratio
        const gearRatio = bikeParameters.chainringTeeth / bikeParameters.cogTeeth;
        // Calculate the wheel circumference
        const wheelCircumference = Math.PI * bikeParameters.wheelDiameter / 1000;
        // Calculate the speed in m/s
        const speed = (gearRatio * wheelCircumference * newCadence) / 60;
        // Convert the speed to km/h if the unit is km/h
        if (newSpeedUnit === "km/h") {
            return (speed * 3.6).toFixed(2);
        }
        //Otherwise convert the speed to mph
        return (speed * 2.23694).toFixed(2);
    }

    const styles = {
        paper: {
            textAlign: "center",
            maxWidth: "600px",
            diplay: "flex",
        },
        parentGrid: {
            flexBasis: "100%",
            width: "100%",
            padding: "8px",
            textAlign: "center",
            paddingBottom: "16px",
            maxWidth: "600px",
            margin: "auto",
        },
        gridRight: {
            flexBasis: "100%",
            width: "100%",
            padding: "8px",
            textAlign: "right",
            paddingBottom: "16px",
        },
        gridLeft: {
            flexBasis: "100%",
            width: "100%",
            padding: "8px",
            textAlign: "left",
            paddingBottom: "16px",
        },
        textField: {
            verticalAlign: "baseline",
        },
        radioGroup: {
            fontSize: "0.6em",
        },
        table: {
            textAlign: "center",
        }
    };

    return (
        <div className="cadenceCalculatorParent">
            <style jsx>{`
       .cadenceCalculatorParent {
         display: flex;
         justify-content: center;
       }
       .cadenceCalculatorChild {
         margin: auto; /* Magic! */
       }
       .cadenceCalculatorSpeed {
         margin-bottom: 20px;
       }
       .cadenceCalculatorCadence {
         margin-bottom: 40px;
       }
       .ListSubheader {
         text-align: left;
         margin-left: 0px;
         margin-right: 0px;
         background: #f5f5f5;
         padding-left: 20px;
       }
     `}</style>

            <Paper className="calculatorBox" style={styles.paper} elevation={3}>
                <div className="ListSubheader">
                    <Typography variant="overline">Bike Parameters</Typography>
                </div>
                <BikeParameters
                    parameters={bikeParameters}
                    handleParametersChange={handleBikeParametersChange}
                />

                <div className="ListSubheader">
                    <Typography variant="overline">Speed & Cadence</Typography>
                </div>
                <Grid container direction="row" justifyContent="center" alignItems="center" style={styles.parentGrid}>


                    <Grid item xs={8} style={styles.gridRight}>
                        <TextField
                            name="cadence"
                            label="Cadence"
                            variant="standard"
                            type="number"
                            value={cadence}
                            onChange={handleCadenceChange}
                            style={styles.textField}
                            InputProps={{
                                inputProps: { min: 0, step: 1 },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        RPM
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} style={styles.gridLeft}>
                    </Grid>


                    <Grid item xs={8} style={styles.gridRight}>
                        <TextField
                            name="speed"
                            label="Speed"
                            variant="standard"
                            type="number"
                            value={speed}
                            onChange={handleSpeedChange}
                            style={styles.textField}
                            InputProps={{
                                inputProps: { min: 0, step: 0.01 },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {speedUnit}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} style={styles.gridLeft}>
                        <ToggleButtonGroup
                            orientation="horizontal"
                            color="primary"
                            value={speedUnit}
                            exclusive
                            size="small"
                            onChange={handleSpeedUnitChange}
                        >
                            <ToggleButton
                                value="km/h"
                                aria-label="km/h"
                                sx={{
                                    textTransform: "lowercase",
                                    width: "50px"
                                }}
                            >
                                km/h
                            </ToggleButton>
                            <ToggleButton
                                value="mph"
                                aria-label="mph"
                                sx={{
                                    textTransform: "lowercase",
                                    width: "50px"
                                }}
                            >
                                mph
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>

                </Grid>
                <div className="ListSubheader">
                    <Typography variant="overline">Cadence Table</Typography>
                </div>
                <div className="cadenceCalculatorChild">
                    <Typography variant="caption" className="cadenceCalculatorCadence">
                        The table is based on bike parameters set above.                    
                    </Typography>
                    <Table style={styles.table}>
                        <TableHead>
                            <TableRow  style={styles.table}>
                                <TableCell style={styles.table}>Cadence (RPM)</TableCell>
                                <TableCell style={styles.table}>Speed (km/h)</TableCell>
                                <TableCell style={styles.table}>Speed (mph)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from({ length: 20 }, (_, i) => {
                                const cadence = 10 + i * 10;
                                const speedKmh = calculateSpeed(cadence, "km/h");
                                const speedMph = calculateSpeed(cadence, "mph");
                                return (
                                    <TableRow key={i}  style={styles.table}>
                                        <TableCell style={styles.table}>{cadence}</TableCell>
                                        <TableCell style={styles.table}>{speedKmh}</TableCell>
                                        <TableCell style={styles.table}>{speedMph}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </div>
            </Paper>
        </div>
    );
}

export default CadenceCalculator;


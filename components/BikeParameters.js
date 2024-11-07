import React, { use, useState, useEffect } from "react";
import { TextField, ToggleButton, ToggleButtonGroup, InputAdornment, Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { color, margin } from "@mui/system";
import { max } from "lodash";

function BikeParameters({ parameters, handleParametersChange }) {
    const [wheelDiameter, setWheelDiameter] = useState(678);
    const [rimSize, setRimSize] = useState(622);
    const [tireSize, setTireSize] = useState(28);
    const [chainringTeeth, setChainringTeeth] = useState(34);
    const [cogTeeth, setCogTeeth] = useState(12);
    const [rimUnit, setRimUnit] = useState("mm");
    const [tireUnit, setTireUnit] = useState("mm");

    const setters = {
        rimSize: setRimSize,
        tireSize: setTireSize,
        chainringTeeth: setChainringTeeth,
        cogTeeth: setCogTeeth,
        rimUnit: setRimUnit,
        tireUnit: setTireUnit,
    };

    const handleChange = (event) => {
        const setter = setters[event.target.name];
        console.log(event.target.name);
        if (setter) {
            setter(event.target.value);
        }
    };

    useEffect(() => {
        setWheelDiameter(calculateWheelDiameter());
        handleParametersChange({
            wheelDiameter: wheelDiameter,
            chainringTeeth: chainringTeeth,
            cogTeeth: cogTeeth,
        });
    }
        , [rimSize, tireSize, rimUnit, tireUnit, chainringTeeth, cogTeeth]);

    function calculateWheelDiameter() {
        let rimDiameter = rimSize;
        if (rimUnit === "in") {
            rimDiameter = rimSize * 25.4;
        }
        let tireDiameter = tireSize;
        if (tireUnit === "in") {
            tireDiameter = tireSize * 25.4;
        }
        return Number(rimDiameter) + Number(tireDiameter) + Number(tireDiameter);
    }

    const styles = {
        parentGrid: {
            flexBasis: "100%",
            width: "100%",
            padding: "8px",
            textAlign: "right",
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
    };


    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" style={styles.parentGrid}>
            <Grid item xs={8} style={styles.gridRight}>
                <TextField
                    name="rimSize"
                    label="Rim Size"
                    variant="standard"
                    type="number"
                    value={rimSize}
                    onChange={handleChange}
                    style={styles.textField}
                    InputProps={{
                        inputProps: { min: 0, step: 0.01 },
                        endAdornment: (
                            <InputAdornment position="end">
                                {rimUnit}
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4} style={styles.gridLeft}>
                <ToggleButtonGroup
                    orientation="horizontal"
                    color="primary"
                    value={rimUnit}
                    exclusive
                    size="small"
                    name="rimUnit"
                    onChange={handleChange}
                >
                    <ToggleButton
                        value="mm"
                        aria-label="mm"
                        name="rimUnit"
                        sx={{
                            textTransform: "lowercase",
                            width: "40px"
                        }}
                    >
                        mm
                    </ToggleButton>
                    <ToggleButton
                        value="in"
                        aria-label="in"
                        name="rimUnit"
                        sx={{
                            textTransform: "lowercase",
                            width: "40px"
                        }}
                    >
                        in
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={8} style={styles.gridRight}>
                <TextField
                    name="tireSize"
                    label="Tire size"
                    variant="standard"
                    type="number"
                    value={tireSize}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: { min: 0, step: 0.01 },
                        endAdornment: (
                            <InputAdornment position="end">
                                {tireUnit}
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={4} style={styles.gridLeft}>
                <ToggleButtonGroup
                    orientation="horizontal"
                    color="primary"
                    value={tireUnit}
                    exclusive
                    size="small"
                    name="tireUnit"
                    onChange={handleChange}
                >
                    <ToggleButton
                        value="mm"
                        aria-label="mm"
                        name="tireUnit"
                        sx={{
                            textTransform: "lowercase",
                            width: "40px"
                        }}
                    >
                        mm
                    </ToggleButton>
                    <ToggleButton
                        value="in"
                        aria-label="in"
                        name="tireUnit"
                        sx={{
                            textTransform: "lowercase",
                            width: "40px"
                        }}
                    >
                        in
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={8} style={styles.gridRight}>
                <TextField
                    name="chainringTeeth"
                    label="Chainring teeth"
                    variant="standard"
                    type="number"
                    value={chainringTeeth}
                    onChange={handleChange}
                    InputProps={{
                        inputProps: { min: 1, step: 1 },
                    }}
                />
            </Grid>
            <Grid item xs={4} style={styles.gridLeft}>
                </Grid>
            <Grid item xs={8} style={styles.gridRight}>
                <TextField
                    name="cogTeeth"
                    label="Cog teeth"
                    variant="standard"
                    type="number"
                    InputProps={{ inputProps: { min: 1, step: 1 } }}
                    value={cogTeeth}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={4} style={styles.gridLeft}>
                </Grid>
        </Grid>
    );
}

export default BikeParameters;


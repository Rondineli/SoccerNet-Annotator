import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";


function mergeByLabel(tight = [], loose = []) {
  const map = {};

  tight.forEach((item) => {
    map[item.label] = { label: item.label, tight: item };
  });

  loose.forEach((item) => {
    map[item.label] = {
      ...map[item.label],
      label: item.label,
      loose: item,
    };
  });

  return Object.values(map);
}

function reorganizeByLabel(data) {
  const result = {};

  for (const [modelName, modelData] of Object.entries(data)) {
    const { loose = [], tight = [] } = modelData;

    // Index tight by label for fast lookup
    const tightByLabel = {};
    for (const t of tight) {
      tightByLabel[t.label] = t;
    }

    // Iterate loose (labels live here too)
    for (const l of loose) {
      const label = l.label;

      if (!result[label]) {
        result[label] = [];
      }

      result[label].push({
        modelName,
        loose: {
          Any: l.Any,
          Visible: l.Visible,
          Unseen: l.Unseen,
        },
        tight: {
          Any: tightByLabel[label]?.Any ?? null,
          Visible: tightByLabel[label]?.Visible ?? null,
          Unseen: tightByLabel[label]?.Unseen ?? null,
        },
      });
    }
  }

  return result;
}


const returnModelHumanTranslation = (model) => {
  const models = {
    json_soccernet_calf_resnetpca512: "SoccerNet Professional",
    json_soccernet_calf_resnetpca512_amateur_model_no_tf: "SoccerNet trained on amateur data",
    json_soccernet_calf_resnetpca512_amateur_model_st_2: "SoccerNet with transfer Learning"
  }

  return models[model];

}


export default function MetricsTable({data}) {

  const _mapColunms = Object.keys(data).sort();
  const _mapObjects = reorganizeByLabel(data);

  const uniqueLabels = [...new Set(Object.values(data).map(v => v.label))];
  console.log(`[DEBUG] => uniqueLabels: ${JSON.stringify(uniqueLabels)}`)

  /*
  {statusData ? (
    Object.entries(statusData).map(([modelName, modelData]) => (
      <div className="row justify-content-center" key={modelName}>
        <MetricsTable
          key={modelName}
          modelName={modelName}
          tight={modelData.tight}
          loose={modelData.loose}
        />
      
      </div>

  */
  //const rows = mergeByLabel(tight, loose);

  const idxController = (idx) => {
    const g = {
      0: "Goal",
      1: "Kick-off",
      2: "Average mAP"
    }
    return g[idx];
  }

  console.log(`[DEBUG] => row after merge: ${JSON.stringify(_mapObjects)}`)
  console.log(`[DEBUG] => data ${JSON.stringify(data)}`)
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Benchmark of SoccerNet models into Amateur fut11 dataset
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
        <Table sx={{borderCollapse: 'separate'}}>
        <TableHead>
          {/* HEADER ROW 1 */}
          <TableRow>
            <TableCell rowSpan={3}>
              <strong>Label</strong>
            </TableCell>

            {_mapColunms.map((model, subIdx) => (
              <TableCell
                key={model}
                align="center"
                colSpan={6}     // 🔥 span subcolumns
                sx={{
                  borderLeft:
                    subIdx % 1 === 0 || subIdx === 0
                      ? (theme) => `1px solid ${theme.palette.divider}`
                      : undefined,
                }}
              >
                <strong>{returnModelHumanTranslation(model)}</strong>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {_mapColunms.map((model) => (
              <>
              {["loose", "tight"].map((metric, subIdx) => (
                <TableCell
                  key={`${model}-${metric}`}
                  align="center"
                  colSpan={3}     // 🔥 span subcolumns
                  sx={{
                    borderLeft:
                      subIdx === 0
                        ? (theme) => `1px solid ${theme.palette.divider}`
                        : undefined,
                  }}
                >
                  <strong>{metric}</strong>
                </TableCell>
              ))}
              </>
            ))}
          </TableRow>

          {/* HEADER ROW 2 */}
          <TableRow>
            {_mapColunms.map((model) => (
              <>
                
                {["Any", "Unseen", "Visible"].map((sub, subIdx) => (
                  <TableCell
                    colSpan={1}
                    key={`${model}-${sub}`}
                    align="center"
                    sx={{
                      borderLeft:
                        subIdx === 0
                          ? (theme) => `1px solid ${theme.palette.divider}`
                          : undefined,
                    }}
                  >
                    {sub}
                  </TableCell>
                ))}
                {["Any", "Unseen", "Visible"].map((sub, subIdx) => (
                  <TableCell
                    colSpan={1}
                    key={`${model}-${sub}`}
                    align="center"
                    sx={{
                      borderLeft:
                        subIdx === 0
                          ? (theme) => `1px solid ${theme.palette.divider}`
                          : undefined,
                    }}
                  >
                    {sub}
                  </TableCell>
                ))}
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {/* iterate over labels */}
            {Object.entries(_mapObjects).map(([label, dt1], idx) => (
              <>
                <TableRow key={`${label}`}>
                  <TableCell align="center">
                    {label}
                  </TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[0]?.loose?.Any}</TableCell>
                  <TableCell align="center">{dt1[0]?.loose?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[0]?.loose?.Visible}</TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[0]?.tight?.Any}</TableCell>
                  <TableCell align="center">{dt1[0]?.tight?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[0]?.tight?.Visible}</TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[1]?.loose?.Any}</TableCell>
                  <TableCell align="center">{dt1[1]?.loose?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[1]?.loose?.Visible}</TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[1]?.tight?.Any}</TableCell>
                  <TableCell align="center">{dt1[1]?.tight?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[1]?.tight?.Visible}</TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[2]?.loose?.Any}</TableCell>
                  <TableCell align="center">{dt1[2]?.loose?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[2]?.loose?.Visible}</TableCell>

                  <TableCell sx={{borderLeft: (theme) => `1px solid ${theme.palette.divider}` }} align="center">{dt1[2]?.tight?.Any}</TableCell>
                  <TableCell align="center">{dt1[2]?.tight?.Unseen}</TableCell>
                  <TableCell align="center">{dt1[2]?.tight?.Visible}</TableCell>
                </TableRow>
              </>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

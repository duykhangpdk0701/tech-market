import React, { useMemo, useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Box,
  Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import style from "./Template.module.scss";
import prototype from "prop-types";
import ItemProduct from "./ItemProduct";
import toPrice from "../../../helper/toPrice";

const Template = (props) => {
  const handleChange = (event, values) => {
    props.setArrangePrice(values);
  };

  return (
    <section className={style.section}>
      <div className={style.container}>
        <div>
          <h3>{props.componentName}</h3>
        </div>
        <div className={style.content_wrapper}>
          <div className={style.content}>
            {props.items.map((item) => {
              return (
                <ItemProduct
                  key={item._id}
                  item={item}
                  userId={props.userId}
                  productId={item._id}
                />
              );
            })}
          </div>
          <aside className={style.category_wrapper}>
            <div className={style.category}>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>Hãng</Typography>
                </AccordionSummary>
                <AccordionDetails accordionId="1">
                  {props.brands.map((item) => (
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={item.name}
                            onChange={props.handleChangeCheckBox}
                          />
                        }
                        label={item.name}
                      />
                    </FormGroup>
                  ))}
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>GIá</Typography>
                </AccordionSummary>
                <AccordionDetails accordionId="1">
                  <Box>
                    <Slider
                      min={1000000}
                      max={50000000}
                      valueLabelFormat={(values) => toPrice(values)}
                      valueLabelDisplay="auto"
                      step={1000000}
                      value={props.arrangePrice}
                      onChange={handleChange}
                    />
                  </Box>
                  <Button onClick={props.handleSubmit}>Xác nhận</Button>
                </AccordionDetails>
              </Accordion>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

Template.prototype = {
  items: prototype.array.isRequired,
  brands: prototype.array.isRequired,
  componentName: prototype.string,
  isLoading: prototype.bool,
};

Template.defaultProps = {
  items: [],
  brands: [],
  componentName: "",
  isLoading: false,
};

export default Template;

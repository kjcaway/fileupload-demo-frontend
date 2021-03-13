import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

/**
 * 레이아웃
 * 
 * @param {React.Component} param0
 */
function CommonLayout({ children, subject, description }) {
  return (
    <div>
      <Container maxWidth="lg" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <CssBaseline />
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {subject}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {description}
        </Typography>
        <React.Fragment>{children}</React.Fragment>
      </Container>
    </div>
  );
}

export default CommonLayout;

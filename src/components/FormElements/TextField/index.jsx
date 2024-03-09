import { TextField, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const styleInput = {
  width: "100%",
  boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
};

const HFTextField = ({
  control,
  name = "",
  disableHelperText = false,
  required = false,
  rules = {},
  inputStyle,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: required ? "This is a required field" : false,
        ...rules,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <TextField
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            error={error}
            color="primary"
            InputProps={{
              style: { ...styleInput, ...inputStyle },
            }}
            {...props}
          />
          {error && !disableHelperText && (
            <FormHelperText error>{error.message}</FormHelperText>
          )}
        </div>
      )}
    ></Controller>
  );
};

export default HFTextField;

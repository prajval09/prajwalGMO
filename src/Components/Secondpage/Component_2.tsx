import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Collapse,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import departmentsData from '../../assets/Data.json';

interface Department {
  department: string;
  sub_departments: string[];
}
const Component_2: React.FC = () => {
const navigate = useNavigate();
useEffect(() => {
  const userDetails = localStorage.getItem('userDetails');
  if (!userDetails) {
    alert('You must enter your details before accessing this page.');
    navigate("/");
  }
}, [navigate]);
  const [open, setOpen] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
  const [departments] = useState<Department[]>(departmentsData);

  const handleToggle = (departmentName: string) => {
    setOpen(open === departmentName ? null : departmentName);
  };

  const handleDepartmentSelect = (departmentName: string, subOptions: string[]) => {
    const newSelectedDepartments = selectedDepartments.includes(departmentName)
      ? selectedDepartments.filter(name => name !== departmentName)
      : [...selectedDepartments, departmentName];

    setSelectedDepartments(newSelectedDepartments);

    const newSelectedSubOptions = selectedDepartments.includes(departmentName)
      ? selectedSubOptions.filter(subOption => !subOptions.includes(subOption))
      : [...selectedSubOptions, ...subOptions];

    setSelectedSubOptions(newSelectedSubOptions);
  };

  const handleSubOptionSelect = (subOption: string) => {
    const newSelectedSubOptions = selectedSubOptions.includes(subOption)
      ? selectedSubOptions.filter(option => option !== subOption)
      : [...selectedSubOptions, subOption];

    setSelectedSubOptions(newSelectedSubOptions);

    const parentDepartment = departments.find(department =>
      department.sub_departments.includes(subOption)
    );

    if (parentDepartment) {
      const allSelected = parentDepartment.sub_departments.every(option =>
        newSelectedSubOptions.includes(option)
      );

      if (allSelected) {
        setSelectedDepartments([...selectedDepartments, parentDepartment.department]);
      } else {
        setSelectedDepartments(selectedDepartments.filter(name => name !== parentDepartment.department));
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Department List
      </Typography>
      <Paper elevation={3}>
        <List>
          {departments.map(department => (
            <React.Fragment key={department.department}>
              <ListItem button onClick={() => handleToggle(department.department)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedDepartments.includes(department.department)}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleDepartmentSelect(department.department, department.sub_departments)}
                  />
                </ListItemIcon>
                <ListItemText primary={department.department} />
                {open === department.department ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open === department.department} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {department.sub_departments.map(subOption => (
                    <ListItem
                      key={subOption}
                      sx={{ pl: 4 }}
                      button
                      onClick={() => handleSubOptionSelect(subOption)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedSubOptions.includes(subOption)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={subOption} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Component_2;

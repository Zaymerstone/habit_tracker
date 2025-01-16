import { Box, Typography, Button, Modal, TextField, ToggleButtonGroup, ToggleButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateHabitPayload, UpdateHabitPayload } from "../../../../entitites/habit/types/habit.payload";
import { useAppDispatch } from "../../hooks/redux";
import { createHabit, HabitData, updateHabit } from "../../../../entitites/habit/models/habit.slice";
import { checkUser } from "../../../../entitites/user/models/user.slice";
import { AsyncThunkAction } from "@reduxjs/toolkit";

interface HabitModalProps {
    habit?: HabitData;
    title: string;
    open: boolean;
    onClose: () => void;
}

const formDataInitialState = {
    name: "",
    everyday: false,
    days: []
}

const weekDaysIndexes = [0, 1, 2, 3, 4, 5, 6]

function HabitModal({ habit, title, open, onClose }: HabitModalProps) {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<CreateHabitPayload | UpdateHabitPayload>(formDataInitialState)
    const handleDays = (
        event: React.MouseEvent<HTMLElement>,
        newDays: number[],
    ) => {
        setFormData(prev => ({
            ...prev,
            days: newDays
        }))
    };

    const clearDays = (
    ) => {
        setFormData(prev => ({
            ...prev,
            days: []
        }))
    }

    const handleFormFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target;

        if (target.type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [target.name]: (target as HTMLInputElement).checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }
        console.log(formData)
    };



    const handleCreateHabit = async () => {
        try {
            await dispatch(createHabit(formData as CreateHabitPayload)).unwrap();
            dispatch(checkUser()).unwrap();
            setFormData(formDataInitialState);
            onClose();
        } catch (error) {
            console.error("Error creating habit or checking user:", error);
        }
    };

    const handleEditHabit = async () => {
        try {
            await dispatch(updateHabit(formData as UpdateHabitPayload)).unwrap();
            dispatch(checkUser()).unwrap();
            setFormData(formDataInitialState);
            onClose();
        } catch (error) {
            console.error("Error editing habit or checking user:", error);
        }
    };

    useEffect(() => {
        if (habit) {
            const { id, name, days, everyday } = habit
            setFormData({
                id, name, days, everyday
            })
        }
    }, [habit])


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-habit-modal"
            aria-describedby="add-habit-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography id="add-habit-modal" variant="h4" component="h2">
                    {title} The Habit
                </Typography>
                <FormGroup sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    <TextField
                        label="Habit Name"
                        name="name"
                        placeholder="Habit name"
                        onChange={handleFormFieldChange}
                        value={formData?.name}
                        fullWidth
                        variant="outlined"
                    />
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"

                    }}>
                        <ToggleButtonGroup
                            value={formData.days}
                            onChange={handleDays}
                        >
                            {weekDaysIndexes?.map((d) => (
                                <ToggleButton value={d} key={d}>
                                    <Typography>{d + 1}</Typography>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={clearDays}
                        >
                            Clear
                        </Button>
                    </Box>
                    <FormControlLabel control={<Checkbox name="everyday" value={formData.everyday} onChange={handleFormFieldChange} checked={formData?.everyday} />} label="Every day" />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={habit ? handleEditHabit : handleCreateHabit}
                    >
                        {title} Habit
                    </Button>
                </FormGroup>
            </Box>
        </Modal>
    )
}

export default HabitModal
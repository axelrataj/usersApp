import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/Button/Button";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import { useAppDispatch, useAppSelector } from "store/hooks/hooks";
import {
  changeActiveUser,
  changeActiveView,
  selectUserData,
  editUser,
  addUser,
  removeUser,
  setMessage,
} from "store/features/users/usersSlice";
import {
  GenderType,
  LevelType,
  PositionType,
  UserDataInterface,
} from "types/types";
import Select from "components/Form/Select";

const actionWrapperHeight = 60;
interface ActionContainerInterface {
  columns: number;
}

const FormStyled = styled(Form)`
  position: relative;
`;

const ActionRemoveStyled = styled.div``;

const ConfirmLabelStyled = styled.p`
  font-size: ${({ theme }) => theme.sizes.s};
  font-weight: ${({ theme }) => theme.weights.medium};
  text-align: center;
`;

const ConfirmActionsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  gap: 2.5rem;
  margin: 1.5rem 0;
`;

const ConfirmStyled = styled.div`
  margin-top: 3rem;
`;

const ActionItemStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 5.5rem;
`;

const ActionContainerStyled = styled.div<ActionContainerInterface>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  height: ${actionWrapperHeight}px;
  gap: 2.5rem;
  position: sticky;
  z-index: 5;
  top: -2.5rem;
`;

const DetailStyled = styled.div``;

const Detail = () => {
  const userData: UserDataInterface[] = useAppSelector(selectUserData);
  const [isEditable, setIsEditable] = useState(userData.length ? false : true);
  const [removeUserConfirm, setRemoveUserConfirm] = useState(true);
  const dispatch = useAppDispatch();

  const handleBack: (e: React.BaseSyntheticEvent) => void = (e) => {
    e.preventDefault();
    dispatch(changeActiveUser("0"));
    dispatch(changeActiveView("list"));
  };

  const handleEdit: (e: React.SyntheticEvent) => void = (e) => {
    e.preventDefault();
    setIsEditable(true);
  };

  const handleRemove: () => void = () => {
    dispatch(removeUser(userData[0]._id as string));
    dispatch(changeActiveUser("0"));
    dispatch(changeActiveView("list"));
    dispatch(
      setMessage({ type: "info", content: "User was successfully deleted!" })
    );
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData: FormData = new FormData(form);
    const formJson: object = Object.fromEntries(formData.entries());

    if (userData.length) {
      dispatch(editUser({ ...formJson } as UserDataInterface));
      dispatch(
        setMessage({ type: "info", content: "User edited successfully!" })
      );
    } else {
      dispatch(
        addUser({ _id: `${Date.now()}`, ...formJson } as UserDataInterface)
      );
      dispatch(
        setMessage({ type: "info", content: "User created successfully!" })
      );
    }

    setIsEditable(false);
  };

  return (
    <>
      <DetailStyled>
        <FormStyled onSubmit={handleSubmit}>
          <ActionContainerStyled columns={2}>
            <ActionItemStyled>
              {userData.length && !isEditable ? (
                <Button onClick={(e) => handleEdit(e)}>edit</Button>
              ) : (
                <Button type="submit">save</Button>
              )}
            </ActionItemStyled>
            <ActionItemStyled>
              <Button onClick={(e) => handleBack(e)}>back</Button>
            </ActionItemStyled>
          </ActionContainerStyled>

          <Input
            name={"name"}
            label={"name"}
            required={true}
            defaultValue={userData.length ? userData[0].name : ""}
            disabled={!isEditable}
          />

          <Select
            label={"position"}
            name={"position"}
            placeholder={""}
            defaultValue={
              userData.length ? (userData[0].position as PositionType) : null
            }
            options={[
              { value: "backend_developer", label: "Backend Developer" },
              { value: "frontend_developer", label: "Frontend Developer" },
              { value: "project_manager", label: "Project Manager" },
            ]}
            disabled={!isEditable}
            required={true}
          />

          <Select
            label={"level"}
            name={"level"}
            placeholder={""}
            defaultValue={
              userData.length ? (userData[0].level as LevelType) : null
            }
            options={[
              { value: "junior", label: "Junior" },
              { value: "mid", label: "Mid" },
              { value: "senior", label: "Senior" },
            ]}
            disabled={!isEditable}
            required={true}
          />

          <Input
            type="email"
            name={"email"}
            label={"email"}
            required={true}
            defaultValue={userData.length ? userData[0].email : ""}
            disabled={!isEditable}
          />

          <Input
            type="tel"
            name={"phone"}
            label={"phone"}
            required={true}
            defaultValue={userData.length ? userData[0].phone : ""}
            disabled={!isEditable}
          />

          <Input
            name={"age"}
            label={"age"}
            type={"number"}
            required={true}
            defaultValue={userData.length ? userData[0].age : ""}
            disabled={!isEditable}
          />

          <Select
            label={"gender"}
            name={"gender"}
            placeholder={""}
            defaultValue={
              userData.length ? (userData[0].gender as GenderType) : null
            }
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
            ]}
            disabled={!isEditable}
            required={true}
          />

          {userData.length && isEditable ? (
            <ActionRemoveStyled style={{ marginTop: "1.5rem" }}>
              {removeUserConfirm ? (
                <ButtonStyled
                  variant="text"
                  onClick={() => setRemoveUserConfirm(false)}
                >
                  remove user
                </ButtonStyled>
              ) : (
                <ConfirmStyled>
                  <ConfirmLabelStyled>Are you sure?</ConfirmLabelStyled>
                  <ConfirmActionsStyled>
                    <ButtonStyled onClick={handleRemove}>yes</ButtonStyled>
                    <ButtonStyled onClick={() => setRemoveUserConfirm(true)}>
                      no
                    </ButtonStyled>
                  </ConfirmActionsStyled>
                </ConfirmStyled>
              )}
            </ActionRemoveStyled>
          ) : null}
        </FormStyled>
      </DetailStyled>
    </>
  );
};

export default Detail;

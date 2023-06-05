import {Form} from 'react-bootstrap';
import {StyledForm, StyledFormItem, StyledFormItemPositioner} from './styles';
import {useForm} from 'react-hook-form';
import {
  smokingType,
  drinkingType,
  sleepingHabitType,
  wakeupType,
  organizeType,
  cleanupType,
  introduce,
} from 'constants/lifestyleList';
import Button from 'components/common/Button/Button';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validationSchema';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {API_USERS_LIFESTYLE} from 'constants/apiUrls';
import {useAlert} from 'hooks/useAlert';
import {useNavigate} from 'react-router-dom';
import {USERS_LIFESTYLE} from 'constants/path';

const LifestyleForm = ({member, lifestyle}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      [smokingType.name]: lifestyle?.smokingType,
      [drinkingType.name]: lifestyle?.drinkingType,
      [sleepingHabitType.name]: lifestyle?.sleepingHabitType,
      [wakeupType.name]: lifestyle?.wakeupType,
      [organizeType.name]: lifestyle?.organizeType,
      [cleanupType.name]: lifestyle?.cleanupType,
      [introduce.name]: lifestyle?.introduce,
    },
  });

  // 페이지 이동을 위해 사용
  const navigate = useNavigate();

  // 알림 창 표시를 위한 훅
  const showAlert = useAlert();

  const jwtAxios = useInterceptedAxios();

  const onSubmit = async data => {
    const body = JSON.stringify(data);

    const method = !!lifestyle ? 'patch' : 'post';

    try {
      const response = await jwtAxios({
        url: API_USERS_LIFESTYLE,
        method: method,
        data: body,
      });
      if (!response) {
        throw new Error('서버와 연결이 불안정합니다.');
      }

      return navigate(`${USERS_LIFESTYLE}/${member.nickname}`);
    } catch (err) {
      const errorCode = err?.response?.data?.errorCode;

      switch (errorCode) {
        default: // 기타 에러에 대한 처리
          showAlert(
            'danger',
            '제출에 실패했습니다. 잠시 후 시도해주세요.',
            2000,
          );
      }
    }
  };

  const onInvalid = error => {};

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
        <StyledFormItemPositioner>
          <StyledFormItem>
            <Form.Label>흡연</Form.Label>
            <Form.Group className="mb-4" controlId="lifestyleFormSmokingType">
              <Form.Text className="mb-2" as="label">
                {smokingType.label}
              </Form.Text>
              <Form.Check
                type="checkbox"
                label={smokingType.placeholder}
                isInvalid={!!errors[smokingType.name]}
                {...register(smokingType.name)}
              />
            </Form.Group>
            <hr />
          </StyledFormItem>
          <StyledFormItem>
            <Form.Label>음주</Form.Label>
            <Form.Group className="mb-3" controlId="lifestyleFormDrinkingType">
              <Form.Text className="mb-1" as="label">
                {drinkingType.label}
              </Form.Text>
              <Form.Select
                isInvalid={!!errors[drinkingType.name]}
                {...register(drinkingType.name)}
              >
                <option value="">{drinkingType.placeholder}</option>
                {drinkingType.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
          </StyledFormItem>
          <StyledFormItem>
            <Form.Label>잠버릇</Form.Label>
            <Form.Group
              className="mb-4"
              controlId="lifestyleFormSleepingHabitType"
            >
              <Form.Text className="mb-2" as="label">
                {sleepingHabitType.label}
              </Form.Text>
              <Form.Check
                type="checkbox"
                label={sleepingHabitType.placeholder}
                isInvalid={!!errors[sleepingHabitType.name]}
                {...register(sleepingHabitType.name)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lifestyleFormWakeupType">
              <Form.Text className="mb-1" as="label">
                {wakeupType.label}
              </Form.Text>
              <Form.Select
                isInvalid={!!errors[wakeupType.name]}
                {...register(wakeupType.name)}
              >
                <option value="">{wakeupType.placeholder}</option>
                {wakeupType.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
          </StyledFormItem>
          <StyledFormItem>
            <Form.Label>청결</Form.Label>
            <Form.Group className="mb-3" controlId="lifestyleFormOrganizeType">
              <Form.Text className="mb-1" as="label">
                {organizeType.label}
              </Form.Text>
              <Form.Select
                isInvalid={!!errors[organizeType.name]}
                {...register(organizeType.name)}
              >
                <option value="">{organizeType.placeholder}</option>
                {organizeType.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lifestyleFormCleanupType">
              <Form.Text className="mb-1" as="label">
                {cleanupType.label}
              </Form.Text>
              <Form.Select
                isInvalid={!!errors[cleanupType.name]}
                {...register(cleanupType.name)}
              >
                <option value="">{cleanupType.placeholder}</option>
                {cleanupType.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <hr />
          </StyledFormItem>
          <StyledFormItem>
            <Form.Group className="mb-1" controlId="lifestyleFormIntroduce">
              <Form.Label>{introduce.label}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={introduce.placeholder}
                style={{height: '8rem', resize: 'none'}}
                isInvalid={!!errors[introduce.name]}
                {...register(introduce.name)}
              ></Form.Control>
            </Form.Group>
            <hr />
          </StyledFormItem>
        </StyledFormItemPositioner>
        <div className="d-grid">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            style={{fontSize: '1rem'}}
          >
            제출하기
          </Button>
        </div>
      </StyledForm>
    </>
  );
};

export default LifestyleForm;

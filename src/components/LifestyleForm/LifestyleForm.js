import {Form} from 'react-bootstrap';
import {StyledForm, StyledFormItem} from './styles';

const LifestyleForm = () => {
  return (
    <StyledForm>
      <StyledFormItem>
        <Form.Label>흡연</Form.Label>
        <Form.Group controlId="formCheckSmoking">
          <Form.Text className="mb-2">흡연 여부</Form.Text>
          <Form.Check type="checkbox" id="check-smoking">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>흡연자예요!</Form.Check.Label>
          </Form.Check>
        </Form.Group>
        <hr />
      </StyledFormItem>
      <StyledFormItem>
        <Form.Label>음주</Form.Label>
        <Form.Group controlId="formSelectDrinking">
          <Form.Text className="mb-1">음주 빈도</Form.Text>
          <Form.Select>
            <option>음주 빈도 선택</option>
            <option>거의 안 마셔요</option>
            <option>일주일에 2회 이하</option>
            <option>기타</option>
          </Form.Select>
        </Form.Group>
        <hr />
      </StyledFormItem>
      <StyledFormItem>
        <Form.Label>잠버릇</Form.Label>
        <Form.Group className="mb-4" controlId="formCheckSleeping">
          <Form.Text className="mb-2">수면 장애</Form.Text>
          <Form.Check type="checkbox" id="check-sleeping">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>이갈이나 코골이가 있어요!</Form.Check.Label>
          </Form.Check>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSelectSleeping">
          <Form.Text className="mb-1">수면 패턴</Form.Text>
          <Form.Select>
            <option>수면 패턴 선택</option>
            <option>6시 전에 일어나요</option>
            <option>6시~9시에 일어나요</option>
            <option>기타</option>
          </Form.Select>
        </Form.Group>
        <hr />
      </StyledFormItem>
      <StyledFormItem>
        <Form.Label>청결</Form.Label>
        <Form.Group className="mb-3" controlId="formSelectOrganizing">
          <Form.Text className="mb-1">물건을 쓰고 언제 정리하나요?</Form.Text>
          <Form.Select>
            <option>정리 주기 선택</option>
            <option>사용하자마자 바로 정리해요</option>
            <option>오늘 안에 정리해요</option>
            <option>내일 정리해요</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSelectCleaning">
          <Form.Text className="mb-1">청소 주기</Form.Text>
          <Form.Select>
            <option>청소 주기 선택</option>
            <option>1주일에 한 번 이상 해요</option>
            <option>2주일에 한 번 이상 해요</option>
            <option>1달에 한 번 이상 해요</option>
          </Form.Select>
        </Form.Group>
        <hr />
      </StyledFormItem>
      <StyledFormItem>
        <Form.Group controlId="formControlEtc">
          <Form.Label>기타</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="취미, 라이프스타일, MBTI 등 자기소개를 자유롭게 써주세요."
            style={{height: '8rem', resize: 'none'}}
          ></Form.Control>
        </Form.Group>
      </StyledFormItem>
    </StyledForm>
  );
};

export default LifestyleForm;

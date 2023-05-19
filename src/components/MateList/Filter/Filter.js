import {useState} from 'react';
import {Form} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {StyledFilterPositioner} from './styles';
import Button from 'components/common/Button';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {validationSchema} from './validationSchema';
import {Slider} from '@mui/material';
import {formatPrice, priceControl} from 'utils/mateUtils';
import {dongMax, priceMax} from 'constants/mateConstants';

const Filter = ({dispatchFilter}) => {
  // 필터링 메뉴 모달의 상태
  const [show, setShow] = useState(true);

  // 연령대 슬라이더의 속성을 정의하는 객체
  const ageControl = {
    max: 33,
    scale: age => {
      if (age < 1) {
        return age + 15;
      } else if (age <= 21) {
        return age + 19;
      } else {
        return 5 * (age - 21) + 40;
      }
    },
    format: age => `${age} 살`,
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      rentType: 'WOLSE',
      price: [0, priceControl['WOLSE'].max],
      residenceType: 'ONE_ROOM',
      dong: null,
      age: [0, ageControl.max],
      postStatus: 'PROGRESS',
    },
  });

  const currentRentType = watch('rentType'); // 필터링 메뉴에서 현재 선택된 주거 형태
  const currentPriceRange = watch('price'); // 필터링 메뉴에서 현재 선택된 가격대
  const currentAgeRange = watch('age'); // 필터링 메뉴에서 현재 선택된 가격대

  // 현재 선택된 가격대의 최솟값과 최댓값을 형식에 맞춰 변환
  const formatedMinPrice = formatPrice(
    priceControl[currentRentType].scale(currentPriceRange[0]),
  );
  const formatedMaxPrice = formatPrice(
    priceControl[currentRentType].scale(currentPriceRange[1]),
  );

  // 현재 선택된 연령대의 최솟값과 최댓값을 형식에 맞춰 변환
  const formatedMinAge = ageControl.format(
    ageControl.scale(currentAgeRange[0]),
  );
  const formatedMaxAge = ageControl.format(
    ageControl.scale(currentAgeRange[1]),
  );

  const showFilter = () => setShow(true);
  const closeFilter = () => setShow(false);

  // 필터링 메뉴 제출 시 filter 상태를 변경한다.
  const onSubmit = data => {
    const {rentType, price, residenceType, dong, age, postStatus} = data;

    // 서버에 보내는 필터 형식에 맞게 가공
    const filter = {
      rentType,
      minPrice: priceControl[rentType].scale(price[0]),
      maxPrice: priceControl[rentType].scale(price[1]),
      residenceType,
      dong,
      minAge: ageControl.scale(age[0]),
      maxAge: ageControl.scale(age[1]),
      postStatus,
    };

    // 필터링 메뉴에서 선택된 값 적용
    dispatchFilter({type: 'CHANGE_FILTER', filter: filter});

    // 모달을 닫음
    closeFilter();
  };

  return (
    <StyledFilterPositioner>
      <Button variant="secondary" onClick={showFilter}>
        필터
      </Button>

      {/* 필터링 메뉴 모달 */}
      <Modal show={show} onHide={closeFilter}>
        <Modal.Header closeButton>
          <Modal.Title>필터링</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            {/* 월세/전세 */}
            <Form.Group className="mb-3" controlId="formRentType">
              <Form.Label>월세/전세</Form.Label>
              <Form.Select
                {...register('rentType', {
                  // 월세/전세 변경 시 가격대의 범위를 변경한다.
                  onChange: () =>
                    setValue('price', [
                      0,
                      priceControl[currentRentType].otherMax,
                    ]),
                })}
                isInvalid={!!errors['rentType']}
              >
                <option value="WOLSE">월세</option>
                <option value="JEONSE">전세</option>
              </Form.Select>
            </Form.Group>
            {/* 가격대 */}
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label className="w-100 d-flex justify-content-between">
                <div>가격대</div>
                <div>
                  {/* 현재 선택된 가격대를 지정된 형식에 맞춰 출력 */}
                  {!!formatedMinPrice && formatedMinPrice}
                  {formatedMinPrice !== formatedMaxPrice &&
                    `~${formatedMaxPrice}`}
                </div>
              </Form.Label>
              <Controller
                name="price"
                control={control}
                defaultValue={[0, priceMax]}
                render={({field}) => (
                  <Slider
                    {...field}
                    onChange={(_, value, activeThumb) => {
                      field.onChange(
                        // Slider의 양 끝이 겹치지 않도록 한다.
                        activeThumb === 0
                          ? [
                              Math.min(value[0], field.value[1] - 1),
                              field.value[1],
                            ]
                          : [
                              field.value[0],
                              Math.max(value[1], field.value[0] + 1),
                            ],
                      );
                    }}
                    disableSwap
                    scale={priceControl[currentRentType].scale}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatPrice}
                    max={priceControl[currentRentType].max}
                    step={1}
                  />
                )}
              />
            </Form.Group>
            {/* 주거 형태 */}
            <Form.Group className="mb-3" controlId="formResidenceType">
              <Form.Label>주거 형태</Form.Label>
              <Form.Select
                {...register('residenceType')}
                isInvalid={!!errors['residenceType']}
              >
                <option value="ONE_ROOM">원룸</option>
                <option value="TWO_ROOM">투룸</option>
                <option value="APARTMENT">아파트</option>
                <option value="STUDIO">오피스텔</option>
              </Form.Select>
            </Form.Group>
            {/* 지역 */}
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>지역 선택</Form.Label>
              <Form.Control
                {...register('dong')}
                isInvalid={!!errors['dong']}
                placeholder="원하시는 지역을 동 단위로 입력해주세요."
                maxLength={dongMax}
              />
            </Form.Group>
            {/* 연령대 */}
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label className="w-100 d-flex justify-content-between">
                <div>연령대</div>
                <div>
                  {/* 현재 선택된 연령대를 지정된 형식에 맞춰 출력 */}
                  {!!formatedMinAge && formatedMinAge}
                  {formatedMinAge !== formatedMaxAge && `~${formatedMaxAge}`}
                </div>
              </Form.Label>
              <Controller
                name="age"
                control={control}
                defaultValue={[15, 100]}
                render={({field}) => (
                  <Slider
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    disableSwap
                    scale={ageControl.scale}
                    valueLabelDisplay="auto"
                    valueLabelFormat={ageControl.format}
                    max={ageControl.max}
                    step={1}
                  />
                )}
              />
            </Form.Group>
            {/* 게시글 상태 */}
            <Form.Group className="mb-3" controlId="formPostStatus">
              <Form.Label>상태</Form.Label>
              <Form.Select
                {...register('postStatus')}
                isInvalid={!!errors['postStatus']}
              >
                <option value="PROGRESS">진행 중</option>
                <option value="DISCUSSION">협의 중</option>
                <option value="COMPLETE">완료</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              size="lg"
              onClick={closeFilter}
              style={{
                fontSize: '1rem',
              }}
            >
              닫기
            </Button>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{
                fontSize: '1rem',
              }}
            >
              적용
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </StyledFilterPositioner>
  );
};

export default Filter;

import {
  ListItemAddress,
  ListItemLeft,
  ListItemMeta,
  ListItemRight,
  ListItemTitle,
  MateListItem,
} from './styles';
import {ListGroup} from 'react-bootstrap';
import {
  postStatusFormat,
  rentTypeFormat,
  residenceTypeFormat,
} from 'constants/mateConstants';
import {formatAgeGroup, formatPrice} from 'utils/mateUtils';
import {useNavigate} from 'react-router-dom';
import {MATES} from 'constants/path';

const MateList = ({mateList}) => {
  const navigate = useNavigate();
  return (
    <>
      <ListGroup variant="flush">
        {mateList.map((mates, index) => (
          <MateListItem
            key={index}
            onClick={() => navigate(`${MATES}/${mates?.postId}`)}
          >
            <ListItemLeft>
              <ListItemTitle>{mates?.title}</ListItemTitle>
              <ListItemMeta direction="horizontal" gap={1}>
                <span>{formatAgeGroup(mates?.age)}</span>
                <span>{'|'}</span>
                <span>{postStatusFormat[mates?.postStatus]}</span>
              </ListItemMeta>
            </ListItemLeft>
            <ListItemRight direction="horizontal" gap={2}>
              <ListItemAddress>
                <span>{mates?.city && `${mates.city} `}</span>
                <span>
                  {mates?.dong ? `${mates.dong} ` : `${mates.roadName} `}
                </span>
              </ListItemAddress>
              <span>{residenceTypeFormat[mates?.residenceType]}</span>
              <span>{rentTypeFormat[mates?.rentType]}</span>
              <span>{formatPrice(mates?.roomPrice)}</span>
            </ListItemRight>
          </MateListItem>
        ))}
      </ListGroup>
    </>
  );
};

export default MateList;

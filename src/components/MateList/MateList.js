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

const MateList = ({mateList}) => {
  return (
    <>
      <ListGroup variant="flush">
        {mateList.mateList.map((mates, index) => (
          <MateListItem key={index}>
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
                <span>{mates?.dong && `${mates.dong} `}</span>
                <span>{mates?.roadName && `${mates.roadName} `}</span>
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

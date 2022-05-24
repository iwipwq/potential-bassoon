import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>Next 모임 - {props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  console.log("getStaticPath run");
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // 필터기준없이 모든 {}오브젝트 주세요
  // 필드 중에 _id <- 이거하나만 필요해요 _id만 포함하고 나머진 제외해주세요
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("meetupIDㅁㄴㅇㄹ", meetupId);
  // 패치
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // 필터기준없이 모든 {}오브젝트 주세요
  // 필드 중에 _id <- 이거하나만 필요해요 _id만 포함하고 나머진 제외해주세요
  // const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // 위와 같이 하지말고 하나의 밋업만 가져오기
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;

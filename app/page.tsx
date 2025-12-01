
import Wrapper from "@/src/components/common/wrapper/Wrapper";
import { Row, Col } from "antd";
function HomePage() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Chiếm 6/24 column = 25% */}
        <Col span={6}>
          <Wrapper styles={{ backgroundColor: "var(--primary)" }}>
            <p>Tổng số khóa học</p>
          </Wrapper>
        </Col>

        {/* Chiếm 12/24 column = 50% */}
        <Col span={12}>
          <Wrapper styles={{ backgroundColor: "var(--secondary)" }}>
            <p>Tổng số học sinh</p>
          </Wrapper>
        </Col>

        {/* Thêm 6 column còn lại để đủ 24 */}
        <Col span={6}>
          <Wrapper styles={{ backgroundColor: "var(--foreground)" }}>
            <p>Khác</p>
          </Wrapper>
        </Col>
      </Row>

    </div>
  );
}

export default HomePage;
